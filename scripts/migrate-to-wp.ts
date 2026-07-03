/**
 * Migración del blog: tmp/blog-export.json → WordPress.
 *
 * Estrategia:
 *   - Posts, medios y categorías/tags vía REST API (Application Passwords).
 *   - Meta protegida (rank_math_*, sbh_author_bio, _prisma_id) vía WP-CLI
 *     dentro del contenedor Docker (valores por STDIN, sin escapado de shell).
 *   - Idempotente: el slug es la clave natural; si el post ya existe se salta
 *     (o se actualiza con --update). Un manifiesto local evita re-subir imágenes.
 *
 * Variables de entorno (en .env o inline):
 *   WP_URL           p.ej. http://localhost:8080
 *   WP_USER          usuario admin de WordPress
 *   WP_APP_PASSWORD  Application Password (Usuarios → Perfil → Application Passwords)
 *   WP_CONTAINER     nombre del contenedor WP (default: wordpress-cms-dev)
 *   WP_AUTHOR_ID     (opcional) ID del usuario autor de los posts; default: el autenticado
 *
 * Uso:
 *   npx tsx scripts/migrate-to-wp.ts --dry-run          # simula, no escribe nada
 *   npx tsx scripts/migrate-to-wp.ts --limit 3           # migra solo 3 posts (prueba)
 *   npx tsx scripts/migrate-to-wp.ts                     # migración completa
 *   npx tsx scripts/migrate-to-wp.ts --update            # re-ejecuta actualizando existentes
 *   npx tsx scripts/migrate-to-wp.ts --validate          # solo valida origen vs WordPress
 *
 * Limitación conocida: post_modified (updatedAt) no se puede fijar vía REST;
 * WordPress lo pone a la fecha de la migración.
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

// ── Config ───────────────────────────────────────────────────────────────────

const WP_URL = (process.env.WP_URL || 'http://localhost:8080').replace(/\/$/, '')
const WP_USER = process.env.WP_USER
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD
const WP_CONTAINER = process.env.WP_CONTAINER || 'wordpress-cms-dev'
const WP_AUTHOR_ID = process.env.WP_AUTHOR_ID ? Number(process.env.WP_AUTHOR_ID) : null
// Categoría destino para TODOS los posts. Con el permalink /%category%/%postname%/
// esto hace que las URLs queden como /blog/{slug}/, igual que el blog original de Next.js.
// La categoría original de Prisma (General/Person) se guarda en la meta _prisma_category.
const WP_CATEGORY = process.env.WP_CATEGORY || 'blog'

const EXPORT_FILE = path.join(process.cwd(), 'tmp/blog-export.json')
const MANIFEST_FILE = path.join(process.cwd(), 'tmp/wp-migration-manifest.json')
const REPORT_FILE = path.join(process.cwd(), 'tmp/wp-migration-report.json')

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const UPDATE = args.includes('--update')
const VALIDATE = args.includes('--validate')
const limitIdx = args.indexOf('--limit')
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity

const STATUS_MAP: Record<string, string> = { draft: 'draft', published: 'publish', publish: 'publish' }

const MIME_EXT: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
}

// ── Tipos ────────────────────────────────────────────────────────────────────

interface ExportedPost {
    id: string
    createdAt: string
    updatedAt: string
    slug: string
    title: string
    content: string
    mainImage: string | null
    authorName: string | null
    authorImage: string | null
    authorBio: string | null
    seoTitle: string | null
    seoDesc: string | null
    focusKeyword: string | null
    json_ld: string | null
    videoUrl: string | null
    videoTitle: string | null
    category: string
    tags: string[]
    status: string
    postImages: { id: string; url: string; altText: string | null }[]
}

interface Manifest {
    media: Record<string, { id: number; url: string }>  // URL origen → medio en WP
    posts: Record<string, number>                        // slug → post ID en WP
}

interface ReportRow {
    slug: string
    action: 'created' | 'updated' | 'skipped' | 'error' | 'dry-run'
    wpId?: number
    warnings: string[]
    error?: string
}

// ── Estado ───────────────────────────────────────────────────────────────────

const manifest: Manifest = fs.existsSync(MANIFEST_FILE)
    ? JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'))
    : { media: {}, posts: {} }

const saveManifest = () => fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2))

const report: ReportRow[] = []
const termCache: Record<string, number> = {}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Genera un slug desde el título con la misma regla que lib/blog-actions.ts. */
function slugify(title: string): string {
    return title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

/** Devuelve el slug del post, generándolo desde el título si viene vacío. */
function resolveSlug(post: ExportedPost, warnings: string[]): string {
    if (post.slug && post.slug.trim()) return post.slug.trim()
    const generated = slugify(post.title)
    warnings.push(`slug vacío en origen → generado desde el título: "${generated}"`)
    return generated
}

// ── Helpers REST ─────────────────────────────────────────────────────────────

const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')

async function wp(pathname: string, init: RequestInit = {}): Promise<any> {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2${pathname}`, {
        ...init,
        headers: {
            Authorization: AUTH,
            ...(init.body && !(init.body instanceof Buffer) ? { 'Content-Type': 'application/json' } : {}),
            ...init.headers,
        },
    })
    const text = await res.text()
    const json = text ? JSON.parse(text) : null
    if (!res.ok) {
        throw new Error(`${init.method || 'GET'} ${pathname} → ${res.status}: ${json?.message || text.slice(0, 200)}`)
    }
    return json
}

async function findExistingPost(slug: string): Promise<any | null> {
    // Sin slug no hay clave de idempotencia: una búsqueda con slug vacío
    // devolvería posts arbitrarios (p.ej. el "Hello world!" por defecto).
    if (!slug || !slug.trim()) return null
    const posts = await wp(`/posts?slug=${encodeURIComponent(slug)}&status=any&context=edit`)
    return posts.length ? posts[0] : null
}

async function ensureTerm(taxonomy: 'categories' | 'tags', name: string): Promise<number> {
    const cacheKey = `${taxonomy}:${name}`
    if (termCache[cacheKey]) return termCache[cacheKey]

    const found = await wp(`/${taxonomy}?search=${encodeURIComponent(name)}&per_page=100`)
    let term = found.find((t: any) => t.name.toLowerCase() === name.toLowerCase())

    if (!term && !DRY_RUN) {
        term = await wp(`/${taxonomy}`, { method: 'POST', body: JSON.stringify({ name }) })
    }

    const id = term?.id ?? 0
    termCache[cacheKey] = id
    return id
}

// ── Medios ───────────────────────────────────────────────────────────────────

async function uploadMedia(sourceUrl: string, baseName: string, altText: string, warnings: string[]): Promise<number | null> {
    if (manifest.media[sourceUrl]) return manifest.media[sourceUrl].id

    if (!/^https?:\/\//.test(sourceUrl)) {
        warnings.push(`imagen con URL no descargable (se deja tal cual): ${sourceUrl}`)
        return null
    }

    let res: Response
    try {
        res = await fetch(sourceUrl)
    } catch (e: any) {
        warnings.push(`fallo de red descargando ${sourceUrl}: ${e.message}`)
        return null
    }
    if (!res.ok) {
        warnings.push(`no se pudo descargar ${sourceUrl} (HTTP ${res.status})`)
        return null
    }

    const contentType = (res.headers.get('content-type') || '').split(';')[0]
    const ext = MIME_EXT[contentType]
    if (!ext) {
        warnings.push(`tipo de imagen no soportado (${contentType}): ${sourceUrl}`)
        return null
    }

    if (DRY_RUN) return null

    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = `${baseName}.${ext}`

    const media = await wp('/media', {
        method: 'POST',
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
        body: buffer,
    })

    // alt text y título del medio
    await wp(`/media/${media.id}`, {
        method: 'POST',
        body: JSON.stringify({ alt_text: altText, title: baseName }),
    })

    manifest.media[sourceUrl] = { id: media.id, url: media.source_url }
    saveManifest()
    return media.id
}

/** Sube las imágenes inline del contenido a WP y reescribe sus URLs. */
async function processInlineImages(content: string, slug: string, warnings: string[]): Promise<string> {
    const srcs = [...content.matchAll(/<img[^>]*\ssrc="([^"]+)"[^>]*>/g)].map(m => m[1])
    let result = content
    let n = 0
    for (const src of srcs) {
        n++
        const mediaId = await uploadMedia(src, `${slug}-inline-${n}`, '', warnings)
        if (mediaId && manifest.media[src]) {
            result = result.replaceAll(src, manifest.media[src].url)
        }
    }
    return result
}

// ── Meta vía WP-CLI (sin tocar la estructura de WordPress) ──────────────────

function setMetaCLI(postId: number, key: string, value: string, warnings: string[]): void {
    if (DRY_RUN) return
    try {
        execFileSync(
            'docker',
            ['exec', '-i', '-u', 'www-data', WP_CONTAINER, 'wp', 'post', 'meta', 'update', String(postId), key],
            { input: value, stdio: ['pipe', 'pipe', 'pipe'] }
        )
    } catch (e: any) {
        warnings.push(`meta ${key} no escrita (WP-CLI): ${e.stderr?.toString().trim() || e.message}`)
    }
}

function getMetaCLI(postId: number, key: string): string | null {
    try {
        return execFileSync(
            'docker',
            ['exec', '-u', 'www-data', WP_CONTAINER, 'wp', 'post', 'meta', 'get', String(postId), key],
            { stdio: ['pipe', 'pipe', 'pipe'] }
        ).toString().trim()
    } catch {
        return null
    }
}

// ── Migración de un post ─────────────────────────────────────────────────────

async function migratePost(post: ExportedPost): Promise<ReportRow> {
    const row: ReportRow = { slug: post.slug, action: 'created', warnings: [] }

    // Slug efectivo: el del origen o, si viene vacío, generado desde el título.
    const slug = resolveSlug(post, row.warnings)
    row.slug = slug

    const existing = await findExistingPost(slug)
    if (existing && !UPDATE) {
        row.action = 'skipped'
        row.wpId = existing.id
        manifest.posts[slug] = existing.id
        saveManifest()
        return row
    }

    const status = STATUS_MAP[post.status]
    if (!status) row.warnings.push(`status desconocido "${post.status}" → se migra como draft`)

    // Imagen destacada
    let featuredMedia: number | null = null
    if (post.mainImage) {
        featuredMedia = await uploadMedia(post.mainImage, `${slug}-cover`, post.title, row.warnings)
    }

    // Imágenes inline del contenido
    const content = await processInlineImages(post.content, slug, row.warnings)

    // Taxonomías: categoría única "blog" para todos (ver WP_CATEGORY).
    const categoryId = await ensureTerm('categories', WP_CATEGORY)
    const tagIds: number[] = []
    for (const tag of post.tags || []) tagIds.push(await ensureTerm('tags', tag))

    if (DRY_RUN) {
        row.action = 'dry-run'
        return row
    }

    const body: any = {
        title: post.title,
        slug,
        content,
        excerpt: post.seoDesc || '',
        status: status || 'draft',
        date_gmt: post.createdAt.replace(/\.\d+Z$/, '').replace(/Z$/, ''),
        categories: categoryId ? [categoryId] : [],
        tags: tagIds,
    }
    if (featuredMedia) body.featured_media = featuredMedia
    if (WP_AUTHOR_ID) body.author = WP_AUTHOR_ID

    const created = existing
        ? await wp(`/posts/${existing.id}`, { method: 'POST', body: JSON.stringify(body) })
        : await wp('/posts', { method: 'POST', body: JSON.stringify(body) })

    row.action = existing ? 'updated' : 'created'
    row.wpId = created.id
    manifest.posts[slug] = created.id
    saveManifest()

    // Meta protegida vía WP-CLI
    const meta: Record<string, string | null> = {
        rank_math_title: post.seoTitle,
        rank_math_description: post.seoDesc,
        rank_math_focus_keyword: post.focusKeyword,
        sbh_author_bio: post.authorBio,      // respaldo: el tema hoy no la muestra
        _prisma_id: post.id,
        _prisma_category: post.category,     // clasificación original (General/Person)
    }
    for (const [key, value] of Object.entries(meta)) {
        if (value) setMetaCLI(created.id, key, value, row.warnings)
    }

    // Campos sin destino directo — solo se avisa si traen datos
    if (post.json_ld) row.warnings.push('json_ld presente: sin destino en WP, revisar manualmente')
    if (post.videoUrl) row.warnings.push(`videoUrl presente (${post.videoUrl}): sin destino en WP, revisar manualmente`)

    return row
}

// ── Validación ───────────────────────────────────────────────────────────────

async function validate(posts: ExportedPost[]) {
    console.log(`\nValidando ${posts.length} posts contra ${WP_URL}...\n`)
    const problems: string[] = []
    let ok = 0

    for (const post of posts) {
        const slug = resolveSlug(post, [])
        const wpPost = await findExistingPost(slug)
        if (!wpPost) {
            problems.push(`${slug}: NO existe en WordPress`)
            continue
        }
        const issues: string[] = []
        if (wpPost.title.rendered.replace(/&#\d+;|&[a-z]+;/g, s => decodeEntity(s)) !== post.title
            && wpPost.title.raw !== post.title) issues.push('título distinto')
        const expectedStatus = STATUS_MAP[post.status] || 'draft'
        if (wpPost.status !== expectedStatus) issues.push(`status ${wpPost.status} ≠ ${expectedStatus}`)
        if (post.mainImage && !wpPost.featured_media) issues.push('sin imagen destacada')
        if (post.seoDesc && !wpPost.excerpt?.raw) issues.push('sin excerpt')

        if (issues.length) problems.push(`${slug}: ${issues.join(', ')}`)
        else ok++
    }

    // Muestreo de meta SEO (10 posts) vía WP-CLI
    const sample = posts.filter(p => p.seoTitle && manifest.posts[resolveSlug(p, [])]).slice(0, 10)
    for (const post of sample) {
        const slug = resolveSlug(post, [])
        const val = getMetaCLI(manifest.posts[slug], 'rank_math_title')
        if (val !== post.seoTitle) problems.push(`${slug}: rank_math_title ≠ esperado (muestreo)`)
    }

    console.log(`✓ Correctos: ${ok}/${posts.length}`)
    if (problems.length) {
        console.log(`✗ Problemas (${problems.length}):`)
        problems.forEach(p => console.log('  -', p))
    } else {
        console.log('Sin discrepancias. Meta SEO muestreada en', sample.length, 'posts.')
    }
    fs.writeFileSync(
        path.join(process.cwd(), 'tmp/wp-validation-report.json'),
        JSON.stringify({ ok, total: posts.length, problems }, null, 2)
    )
}

function decodeEntity(s: string): string {
    const map: Record<string, string> = { '&amp;': '&', '&#8217;': '’', '&#8216;': '‘', '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—' }
    return map[s] ?? s
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    if (!WP_USER || !WP_APP_PASSWORD) {
        console.error('Faltan WP_USER y/o WP_APP_PASSWORD en el entorno.')
        process.exit(1)
    }
    if (!fs.existsSync(EXPORT_FILE)) {
        console.error(`No existe ${EXPORT_FILE}. Ejecuta primero: npx tsx scripts/export-blog.ts`)
        process.exit(1)
    }

    const posts: ExportedPost[] = JSON.parse(fs.readFileSync(EXPORT_FILE, 'utf8'))

    // Verificación de conexión y credenciales antes de empezar
    try {
        await wp('/users/me')
    } catch (e: any) {
        console.error(`No se pudo autenticar contra ${WP_URL}: ${e.message}`)
        process.exit(1)
    }

    if (VALIDATE) return validate(posts)

    const toMigrate = posts.slice(0, LIMIT)
    console.log(`Migrando ${toMigrate.length}/${posts.length} posts hacia ${WP_URL}` +
        (DRY_RUN ? ' [DRY-RUN: no se escribe nada]' : '') + '\n')

    for (const [i, post] of toMigrate.entries()) {
        try {
            const row = await migratePost(post)
            report.push(row)
            const warn = row.warnings.length ? `  ⚠ ${row.warnings.join(' | ')}` : ''
            console.log(`[${i + 1}/${toMigrate.length}] ${row.action.padEnd(8)} ${post.slug}${warn}`)
        } catch (e: any) {
            report.push({ slug: post.slug, action: 'error', warnings: [], error: e.message })
            console.error(`[${i + 1}/${toMigrate.length}] ERROR    ${post.slug}: ${e.message}`)
        }
    }

    // Resumen
    const counts: Record<string, number> = {}
    for (const r of report) counts[r.action] = (counts[r.action] || 0) + 1
    console.log('\n── Resumen ──')
    Object.entries(counts).forEach(([k, v]) => console.log(`${k}: ${v}`))
    const withWarnings = report.filter(r => r.warnings.length)
    if (withWarnings.length) console.log(`posts con avisos: ${withWarnings.length} (detalle en el reporte)`)
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2))
    console.log(`Reporte: ${path.relative(process.cwd(), REPORT_FILE)}`)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})

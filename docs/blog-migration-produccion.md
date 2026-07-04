# Migración del blog a WordPress — Producción

Guía para migrar los posts del blog custom (Next.js + Prisma + PostgreSQL) al
WordPress de producción (`blog.spencerbuyshouses.com`), usando el script
`scripts/migrate-to-wp.ts`.

> Antes de leer esto conviene haber hecho al menos una corrida completa en local
> (ver el flujo con `wordpress-cms-dev`). Esta guía asume que el script ya está
> validado y solo cubre las diferencias y precauciones de producción.

---

## 1. Cómo funciona el script (resumen)

El script usa **dos canales** para escribir en WordPress:

| Dato | Canal | Requisito |
|---|---|---|
| Post, imágenes, categoría, tags, excerpt, fecha | **REST API** (Application Password) | Acceso HTTPS a `WP_URL` |
| Meta protegida: `rank_math_*`, `sbh_author_bio`, `_prisma_id`, `_prisma_category` | **WP-CLI** (`docker exec <contenedor> wp ...`) | Ejecutarse **en el mismo host donde corre el contenedor de WordPress** |

**Consecuencia crítica:** como la meta SEO se escribe con `docker exec`, el paso de
migración **debe ejecutarse en el host del VPS** donde vive el contenedor
`wordpress-cms`. No se puede correr desde tu laptop apuntando a producción, porque
el `docker exec` no alcanzaría el contenedor remoto (los posts se crearían, pero
**toda la meta de SEO fallaría**). Tampoco desde *dentro* del contenedor de Next:
ese contenedor no tiene el CLI ni el socket de Docker, así que no puede hacer
`docker exec` al de WordPress.

Como en el VPS conviven el Next.js (`docker-compose.stage.yml`) y WordPress, y el
Postgres de producción es el contenedor `db` de ese mismo compose (expuesto en el
host en `127.0.0.1:5432`), **lo más simple es correr TODO en el host del VPS**:
export y migración en el mismo lugar, sin transferir archivos.

---

## 2. Diferencias clave: local vs producción

| Aspecto | Local (dev) | Producción |
|---|---|---|
| Contenedor WordPress | `wordpress-cms-dev` | `wordpress-cms` |
| `WP_URL` | `http://localhost:8080` | `https://blog.spencerbuyshouses.com` (HTTPS obligatorio, ver nota) |
| Application Passwords | Requieren `WP_ENVIRONMENT_TYPE=local` (HTTP) | Funcionan directo (HTTPS real) — **no** agregar esa constante |
| S3 / Offload Media | Desactivado (medios locales) | Activo → los medios subidos van al bucket S3 del blog |
| Base de datos origen | Postgres local (datos de seed) | Contenedor `db` de `docker-compose.stage.yml` en el VPS, expuesto en `127.0.0.1:5432` |
| Dónde corre el script | Tu laptop | **Todo en el host del VPS** (export + migración) |

> **Nota sobre `WP_URL`:** aunque corras en el host del VPS, usa la URL pública
> `https://blog.spencerbuyshouses.com` para la REST API, **no** `http://127.0.0.1:8080`.
> WordPress de producción no es entorno `local`, así que rechaza la autenticación
> con Application Password sobre HTTP plano. El `docker exec` de la meta, en cambio,
> usa el nombre del contenedor y no pasa por HTTP.

---

## 3. Requisitos previos

- [ ] **Backup de WordPress de producción** hecho y verificado (ver §9). No continuar sin esto.
- [ ] Acceso SSH al host del VPS y permiso para `docker exec` sobre `wordpress-cms`.
- [ ] El **repo `spencer-buys-houses-v2` presente en el VPS** (ya lo está: es el que
      construye la imagen con `build: context: .`). De ahí salen `scripts/`, `prisma/` y `package.json`.
- [ ] **Node.js + pnpm** instalados en el host del VPS. Una sola vez, dentro del repo:
      `pnpm install` y `pnpm prisma generate` (genera `app/generated/prisma`, que está en `.gitignore`).
- [ ] El contenedor Postgres de producción corriendo y accesible en `127.0.0.1:5432`
      (es el servicio `db` de `docker-compose.stage.yml`).
- [ ] Permalinks de WordPress en `/%category%/%postname%/` (ver §5.2).
- [ ] Límites de subida suficientes en Nginx/PHP si las imágenes reales son grandes
      (`client_max_body_size`, `upload_max_filesize`, `post_max_size`).

---

## 4. Variables de entorno (en el VPS)

El script lee estas variables (de `.env` o inline). En el VPS, para la migración:

```env
WP_URL=https://blog.spencerbuyshouses.com
WP_USER=<usuario_admin_de_wordpress>
WP_APP_PASSWORD=<application password generada en prod>
WP_CONTAINER=wordpress-cms
# Categoría destino de TODOS los posts → URLs /blog/{slug}/ (igual que el Next.js original)
WP_CATEGORY=blog
# Postgres de producción (contenedor db del stage compose, expuesto en el host)
DATABASE_URL=postgresql://spencer_user:spencer_password@127.0.0.1:5432/spencer_db?schema=public
# Opcional: ID del usuario autor en WP. Si se omite, usa el usuario autenticado.
# WP_AUTHOR_ID=1
```

> `DATABASE_URL` solo lo usa el paso de exportación; las variables `WP_*` solo la
> migración. Puedes tener todo en un mismo `.env` en el host del VPS.
> Ajusta el usuario/clave/nombre de la base si tu `docker-compose.stage.yml` usa otros.

---

## 5. Procedimiento paso a paso

### 5.1 Backup de WordPress (obligatorio)

Desde el VPS, respaldar la base de datos de WordPress antes de tocar nada. La
imagen es **MariaDB 11.4**, así que la herramienta es `mariadb-dump` (el nombre
`mysqldump` ya no existe en MariaDB 11.x):

```bash
docker exec wordpress-db sh -c \
  'exec mariadb-dump -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' \
  > wp-backup-$(date +%F).sql
```

O usar el backup de **UpdraftPlus** desde el admin de WordPress. Verificar que el
archivo se generó y tiene tamaño razonable.

### 5.2 Preparar WordPress de producción

```bash
# Permalinks (una vez): la categoría forma parte de la URL
docker exec -u www-data wordpress-cms wp option update permalink_structure '/%category%/%postname%/'
docker exec -u www-data wordpress-cms wp rewrite flush --hard

# Verificar que la REST API responde (debe dar HTTP 200)
curl -s -o /dev/null -w '%{http_code}\n' https://blog.spencerbuyshouses.com/wp-json/
```

Si `/wp-json/` no da 200, revisar que Apache tenga `mod_rewrite` activo y que el
`.htaccess` de WordPress exista (las reglas `RewriteRule . /index.php`).

**Limpieza opcional pero recomendada** (dejar solo la categoría `blog`):

```bash
# Borrar el post de ejemplo "Hello world!" si existe
docker exec -u www-data wordpress-cms wp post delete $(docker exec -u www-data wordpress-cms wp post list --name=hello-world --field=ID) --force

# Poner "blog" como categoría por defecto y borrar "Uncategorized"
BLOG_ID=$(docker exec -u www-data wordpress-cms wp term list category --slug=blog --field=term_id)
# (si la categoría "blog" aún no existe, se crea sola en el primer post; ejecutar esto después del dry-run)
docker exec -u www-data wordpress-cms wp option update default_category $BLOG_ID
docker exec -u www-data wordpress-cms wp term delete category $(docker exec -u www-data wordpress-cms wp term list category --slug=uncategorized --field=term_id)
```

### 5.3 Crear la Application Password

En `https://blog.spencerbuyshouses.com/wp-admin` → **Usuarios → Perfil →
Application Passwords** → crear una (ej. nombre `migracion`) y copiar el valor.
En prod (HTTPS) aparece sin necesidad de configurar nada extra.

Probar que autentica:

```bash
curl -u "USUARIO:APP_PASSWORD" https://blog.spencerbuyshouses.com/wp-json/wp/v2/users/me
```

Debe devolver un JSON con tu usuario. Si da `rest_not_logged_in`, revisar usuario/clave.

### 5.4 Preparar el repo y exportar los posts (en el host del VPS)

Situarte en el repo que ya está en el VPS y, una sola vez, instalar dependencias
y generar el cliente Prisma:

```bash
cd /ruta/al/repo/spencer-buys-houses-v2
pnpm install              # una vez
pnpm prisma generate      # una vez → crea app/generated/prisma (gitignored)
```

Exportar contra el Postgres de producción (el contenedor `db` del stage compose,
en `127.0.0.1:5432`):

```bash
DATABASE_URL="postgresql://spencer_user:spencer_password@127.0.0.1:5432/spencer_db?schema=public" \
  pnpm tsx scripts/export-blog.ts
# → genera tmp/blog-export.json con todos los posts
```

Revisar el conteo que imprime y, opcionalmente, inspeccionar el JSON. Como la
migración corre en este mismo host, **no hace falta ningún `scp`**.

> **Empieza con un manifiesto limpio.** Si en el repo del VPS quedó un
> `tmp/wp-migration-manifest.json` de alguna prueba, bórralo antes de migrar: sus
> IDs de medios/posts no corresponden al WordPress de producción.
> `rm -f tmp/wp-migration-manifest.json`

### 5.5 Dry-run (no escribe nada)

Desde el mismo directorio del repo en el VPS (donde ya está `tmp/blog-export.json`):

```bash
pnpm tsx scripts/migrate-to-wp.ts --dry-run
```

Revisar el resumen y los avisos. Debe procesar el total de posts sin errores de
autenticación ni de conexión.

### 5.6 Prueba con 3 posts

```bash
pnpm tsx scripts/migrate-to-wp.ts --limit 3
```

Verificar en el admin de WordPress (pestaña **Borradores**) que esos 3 posts se
ven bien: contenido, imagen destacada (cargando desde S3), categoría `blog`, y la
meta de Rank Math en la caja de SEO.

### 5.7 Migración completa

```bash
pnpm tsx scripts/migrate-to-wp.ts
```

Crea los posts restantes y **salta** los 3 ya migrados (idempotencia por slug).
Al terminar, el reporte queda en `tmp/wp-migration-report.json`.

### 5.8 Validación

```bash
pnpm tsx scripts/migrate-to-wp.ts --validate
```

Compara cada post del origen contra WordPress (existencia, título, estado, imagen
destacada, excerpt) y muestrea la meta `rank_math_title`. El detalle queda en
`tmp/wp-validation-report.json`.

---

## 6. Post-procesamiento (opcional)

Todas estas operaciones actúan **solo sobre los posts migrados**, identificados por
la meta `_prisma_id` que el script deja en cada uno. Así nunca tocan otro contenido
que pudiera existir en WordPress.

### 6.1 Publicar los posts

Los posts se importan como **draft** (respetando el estado del origen). Cuando ya
los revisaste y quieres publicarlos, puedes hacerlo en bloque:

```bash
docker exec -u www-data wordpress-cms wp post list \
  --post_status=draft --meta_key=_prisma_id --field=ID \
  | xargs -n1 -I{} docker exec -u www-data wordpress-cms wp post update {} --post_status=publish
```

> Si en el origen algunos posts ya estaban en `published`, el script los crea
> directamente como `publish` y no hace falta este paso para ellos.

### 6.2 Cambiar el autor de todos los posts

El script asigna como autor al usuario autenticado que corrió la migración (o al
`WP_AUTHOR_ID` que hayas definido). Para reasignar todos los posts migrados a otro
autor necesitas el **ID numérico** del usuario destino.

**1. Ubicar (o crear) el usuario autor.** Lista los usuarios existentes:

```bash
docker exec -u www-data wordpress-cms wp user list --fields=ID,user_login,display_name,roles
```

Si el autor no existe todavía, créalo (`--porcelain` imprime solo el ID nuevo):

```bash
docker exec -u www-data wordpress-cms wp user create spencer spencer@spencerbuyshouses.com \
  --role=author --display_name="Spencer Shadrach" --porcelain
```

**2. Reasignar el autor en todos los posts migrados** (sustituye `<USER_ID>` por el ID):

```bash
docker exec -u www-data wordpress-cms wp post list \
  --post_status=any --meta_key=_prisma_id --field=ID \
  | xargs -n1 -I{} docker exec -u www-data wordpress-cms wp post update {} --post_author=<USER_ID>
```

> `--post_status=any` asegura que abarque los posts estén en `draft` o `publish`.
> `--post_author` espera el **ID**, no el login.

**3. (Opcional) Nombre y bio que muestra el tema.** El tema `spencer-blog` muestra
en la caja "About the Author" el **nombre y la bio del perfil del usuario**
(`get_the_author_meta('description')`), no la bio por-post. Si quieres que se vea
correcto, ajústalos en el usuario:

```bash
docker exec -u www-data wordpress-cms wp user update <USER_ID> \
  --display_name="Spencer Shadrach" \
  --description="Spencer ayuda a propietarios de Memphis a vender su casa rápido y sin complicaciones."
```

> Recuerda que la bio específica de cada post quedó guardada en la meta
> `sbh_author_bio` como respaldo, pero el tema actual no la usa.

---

## 7. Verificación post-migración

- [ ] Abrir varias URLs `https://blog.spencerbuyshouses.com/blog/{slug}/` y confirmar que cargan.
- [ ] Las imágenes destacadas e inline cargan desde el bucket S3 (revisar el `src` en el HTML).
- [ ] La caja de SEO de Rank Math muestra título/descripción/keyword en algunos posts.
- [ ] El sitemap de Rank Math (`/sitemap_index.xml`) incluye los posts publicados.
- [ ] Fechas correctas: la fecha de publicación coincide con la del origen.

---

## 8. Idempotencia y re-ejecución

- La **clave de idempotencia es el slug**: re-ejecutar el script salta los posts
  que ya existen. Para forzar actualización de los existentes, usar `--update`.
- El **manifiesto** (`tmp/wp-migration-manifest.json`) recuerda qué imágenes ya se
  subieron, evitando duplicados en S3, y hace la corrida reanudable si se interrumpe.
- Si necesitas empezar de cero limpio: restaurar el backup de WP (§9), borrar
  `tmp/wp-migration-manifest.json`, y volver a correr.

---

## 9. Rollback

Si algo sale mal, restaurar el backup tomado en §5.1:

```bash
docker exec -i wordpress-db sh -c \
  'exec mariadb -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' \
  < wp-backup-YYYY-MM-DD.sql
```

O restaurar desde **UpdraftPlus** en el admin. Los medios ya subidos a S3 no se
borran con esto; si quieres limpiarlos, hazlo desde la consola de S3 filtrando por
la carpeta/fecha de la migración.

---

## 10. Limitaciones conocidas

- **`updatedAt` (post_modified) no se puede fijar vía REST**: WordPress lo pone a
  la fecha de la migración. La fecha de publicación (`createdAt`) sí se preserva.
- **Campos sin destino directo**: si algún post trae `json_ld` o `videoUrl`, el
  script lo reporta como aviso pero no lo migra (revisar manualmente si aplica).
- **Imágenes con URL no descargable** (rutas relativas rotas en el origen) se
  reportan como aviso y se dejan tal cual en el contenido.
- **Bio por post**: se guarda en la meta `sbh_author_bio` como respaldo, pero el
  tema actual muestra la bio del perfil de usuario de WordPress, no la del post.

---

## 11. Checklist rápido

```
[ ] Backup de WordPress prod verificado
[ ] En el host del VPS: pnpm install + pnpm prisma generate (una vez)
[ ] Permalinks /%category%/%postname%/ + /wp-json/ responde 200
[ ] Application Password creada y probada
[ ] .env en el VPS: DATABASE_URL (127.0.0.1:5432) + WP_* (WP_CONTAINER=wordpress-cms)
[ ] tmp/wp-migration-manifest.json inexistente (borrar si quedó de una prueba)
[ ] export-blog.ts corrido contra el Postgres de prod → tmp/blog-export.json
[ ] --dry-run limpio
[ ] --limit 3 y revisión visual en el admin
[ ] Migración completa
[ ] --validate sin discrepancias
[ ] (Opcional) publicar posts migrados y/o reasignar autor (§6)
[ ] Verificación de URLs, imágenes en S3, Rank Math y sitemap
```

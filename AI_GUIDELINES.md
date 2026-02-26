# Spencer Buys Houses — AI Development Guidelines

> Documento de referencia para cualquier asistente de IA que trabaje en este proyecto.
> Última actualización: 2026-02-25

---

## 1. Resumen del Proyecto

| Campo | Valor |
|---|---|
| **Nombre** | Spencer Buys Houses v2 |
| **Tipo** | Landing page / lead-generation para comprador de casas en efectivo |
| **Mercado** | Memphis, TN y áreas circundantes |
| **Objetivo principal** | Capturar leads (formulario + llamada telefónica) |
| **Teléfono** | (901) 621-8799 · `tel:+19016218799` |
| **Dominio** | `https://www.spencerbuyshouses.com` |
| **Nombre visible** | `SpencerBuysHouses.com` |

---

## 2. Stack Tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Pages bajo `app/` |
| Lenguaje | **TypeScript** (strict) | Siempre tipado, nunca `any` |
| Estilos | **Tailwind CSS v4** | Utility-first, sin archivos CSS custom salvo `globals.css` |
| UI primitivas | **Radix UI** + **shadcn/ui** | `components/ui/` (button, accordion, input…) |
| Iconos | **Lucide React** + **React Icons** (social) | Preferir Lucide para iconos generales |
| Animación | **Framer Motion** | Solo en componentes `"use client"` |
| Formularios | **React Hook Form** + **Zod** | Validación con `zodResolver` |
| Analytics | **Vercel Analytics** | Cargado en `layout.tsx` |
| Package manager | **pnpm** (workspace) | `pnpm-workspace.yaml` presente |
| Linting | **ESLint** (flat config `eslint.config.mjs`) | — |

---

## 3. Estrategia de Renderizado — SSG / Server Components

### Principio central

> **Cada página debe ser exportable como HTML estático al 100%.** La web está pensada como **Generación de Sitios Estáticos (SSG)** para maximizar rendimiento y SEO.

### Reglas

1. **Server Components por defecto.** Todo archivo `.tsx` dentro de `app/` y `components/` es un Server Component a menos que necesite interactividad.
2. **`"use client"` solo para hojas interactivas.** Formularios, animaciones con Framer Motion y lógica de estado (useState, useEffect) se aíslan en componentes hoja — nunca en layouts ni en páginas.
3. **Sin `getServerSideProps` ni `force-dynamic`.** No usar generación dinámica por request. Si en el futuro se necesita ISR, configurar `revalidate` pero nunca SSR puro.
4. **Data estática.** Los datos de testimonios, beneficios, FAQs, etc. son constantes definidas dentro de los propios componentes (no se obtienen de API en runtime).
5. **Metadata estática.** Cada `page.tsx` exporta `metadata: Metadata` (no `generateMetadata` dinámico) para que Next.js la resuelva en build-time.
6. **JSON-LD en Server Components.** Todo dato estructurado se renderiza con `<JsonLd data={...} />` o con `<script type="application/ld+json">` directamente en Server Components para que esté en el HTML inicial.

### Patrón de composición Server → Client

```
page.tsx (Server)             ← metadata + layout + JSON-LD
  └── ContentSection (Server) ← headings, copy, semantic HTML
        ├── LeadForm (Client) ← "use client" — formulario interactivo
        └── AnimatedCards (Client) ← "use client" — Framer Motion
```

---

## 4. Arquitectura de Componentes y Reutilización

### Estructura de carpetas

```
components/
  forms/          → Formularios reutilizables (LeadForm, LeadFormConsent)
  layout/         → Header, Footer (con barrel export en index.ts)
  sections/       → Secciones de página reutilizables (con barrel export en index.ts)
  seo/            → Componentes de SEO (JsonLd)
  ui/             → Primitivas UI de shadcn (Button, Input, Accordion…)
```

### Reglas de reutilización

> **PROHIBIDO duplicar código de un componente que ya existe.** Si una sección se repite en varias páginas, DEBE existir un único componente en `components/sections/` y reutilizarse con props.

#### Componentes reutilizables existentes

| Componente | Ruta | Propósito |
|---|---|---|
| `CallNowBanner` | `components/sections/call-now-banner.tsx` | Banner de CTA con fondo amber, teléfono + botón de acción. Se usa en home (CTASection) y en `/get-a-cash-offer-today/`. Acepta props para personalizar badge, heading, description. |
| `CTASection` | `components/sections/cta-section.tsx` | Wrapper de `CallNowBanner` con texto "Guaranteed Close Date" para la home page. |
| `LeadForm` | `components/forms/lead-form.tsx` | Formulario de captura de leads simple. |
| `LeadFormConsent` | `components/forms/lead-form-consent.tsx` | Formulario de leads con consentimiento SMS y Privacy Policy. |
| `StickyHeader` | `components/layout/header.tsx` | Header fijo con logo, teléfono y redes sociales. |
| `SiteFooter` | `components/layout/site-footer.tsx` | Footer con links, contacto y redes sociales. |
| `JsonLd` | `components/seo/json-ld.tsx` | Inyección de datos JSON-LD estructurados. |

#### Al crear nuevas secciones

1. ¿La sección se usará en más de una página? → Crear en `components/sections/` y exportar desde `index.ts`.
2. ¿La sección es exclusiva de una ruta? → Puede vivir en `app/<ruta>/` como archivo local, pero si crece, mover a `components/sections/`.
3. Componentes `"use client"` → Aislar la parte interactiva. El contenedor/wrapper debe ser Server Component siempre que sea posible.

### Barrel exports

Cada carpeta con varios componentes debe tener un `index.ts` con re-exports:

```ts
// components/sections/index.ts
export { HeroBold } from "./hero-bold"
export { CallNowBanner } from "./call-now-banner"
// …
```

---

## 5. Paleta de Colores y Design Tokens

### Colores principales

| Nombre | Hex | Uso |
|---|---|---|
| **Deep Navy** | `#0f0f23` | Fondo principal de secciones oscuras, texto sobre amber |
| **Dark Navy** | `#13132b` | Fondo alternado de secciones (genera ritmo visual) |
| **Deepest Navy** | `#0a0a1a` | Fondo del footer |
| **Amber** | `#f59e0b` | Color de acento principal, CTAs, badges, iconos, hover states |
| **Amber Hover** | `#d97706` | Hover de botones amber |
| **Navy Hover** | `#1a1a3e` | Hover de botones dark |
| **Success Green** | `#22c55e` | Check marks, estado de éxito, confirmaciones |
| **White** | `#ffffff` | Texto principal sobre fondos oscuros |
| **Gray 300** | `text-gray-300` | Texto secundario (beneficios, bullet points) |
| **Gray 400** | `text-gray-400` | Texto de cuerpo / descriptivo |
| **Gray 500** | `text-gray-500` | Texto terciario (footer, labels menores) |

### Opacidades recurrentes

| Patrón | Uso |
|---|---|
| `bg-[#f59e0b]/10` | Fondo de badges/pills y iconos |
| `bg-[#f59e0b]/20` | Hover de icono containers |
| `bg-white/5` | Cards sobre fondo oscuro |
| `border-white/10` | Bordes de cards y separadores |
| `border-[#f59e0b]/30` | Hover de bordes de cards |
| `bg-[#0f0f23]/10` | Elementos sobre fondo amber |

---

## 6. Tipografía

| Variable | Fuente | Uso |
|---|---|---|
| `--font-inter` | **Inter** | Fuente sans-serif principal (body) |
| `--font-open-sans` | **Open Sans** | Fuente secundaria (disponible) |

### Tamaños de texto comunes

| Elemento | Clases Tailwind |
|---|---|
| H1 (hero) | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight` |
| H2 (secciones) | `text-3xl md:text-4xl font-bold` |
| H3 (cards) | `text-lg font-bold` |
| Body | `text-gray-400 leading-relaxed` |
| Badge/pill | `text-sm font-semibold uppercase tracking-wide` |
| CTA button | `text-lg font-bold` |

---

## 7. Patrones UI/UX

### 7.1 Secciones

- **Padding vertical:** `py-20 lg:py-28` para secciones de contenido.
- **Container:** `mx-auto max-w-7xl px-4 lg:px-8`.
- **Fondo alternado:** Alternar entre `bg-[#0f0f23]` y `bg-[#13132b]` para generar ritmo visual.
- Cada sección tiene un `aria-labelledby` apuntando a su heading con id.

### 7.2 Badges / Pills

```tsx
<p className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
    Texto del badge
</p>
```

### 7.3 Cards

```
rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-colors
```

- Icon container: `flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20 transition-colors`
- Iconos: `h-6 w-6 text-[#f59e0b]`

### 7.4 Botones

**Primario (sobre fondo oscuro):**
```tsx
<a className="inline-block rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] px-6 py-3 text-sm font-bold transition-colors text-center">
```

**Primario (sobre fondo amber):**
```tsx
<Button className="bg-[#0f0f23] hover:bg-[#1a1a3e] text-white hover:text-[#f59e0b] text-lg px-8 h-14 font-bold">
```

**Outline:**
```tsx
<a className="inline-block rounded-lg border border-white/20 hover:border-[#f59e0b]/50 text-white px-6 py-3 text-sm font-bold transition-colors text-center">
```

### 7.5 Formularios

- Formularios siempre en componentes `"use client"`.
- Usar `react-hook-form` + `zod` para validación.
- Inputs con iconos a la izquierda (Lucide).
- Estado de éxito animado con Framer Motion.
- Respetar el patrón **mobile: inline / desktop: lateral** del hero (form visible en ambos breakpoints con `lg:hidden` / `hidden lg:block`).

### 7.6 Ambient Glow (decorativo)

```tsx
<div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl" />
```

- Siempre con `aria-hidden="true"` y `absolute` dentro de un contenedor `relative overflow-hidden`.

### 7.7 CTA dual (teléfono + formulario)

Patrón consistente en todas las páginas:
- **Botón primario:** "Get Your Free Cash Offer" → ancla a `#top` (formulario).
- **Botón secundario:** "Call (901) 621-8799" → `tel:+19016218799`.

---

## 8. SEO — Directrices

### 8.1 Principios

1. **Todo el contenido SEO-crítico se renderiza en Server Components** — headings, body copy, semantic HTML deben estar en el HTML inicial.
2. **Un solo `<h1>` por página**, siempre en el hero.
3. **JSON-LD estructurado** en cada página: WebPage, LocalBusiness, BreadcrumbList, Review, AggregateRating según corresponda.
4. **Metadata completa**: title, description, canonical, OpenGraph, Twitter cards en cada `page.tsx`.
5. **Semantic HTML**: usar `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`, `<blockquote>` según corresponda.
6. **`aria-labelledby`** en cada `<section>` apuntando a su heading.
7. **`alt` descriptivo** en todas las imágenes (nunca vacío salvo iconos decorativos con `aria-hidden`).
8. **Canonical URLs** siempre con trailing slash: `/get-a-cash-offer-today/`.
9. **Next.js `<Image>`** para todas las imágenes con `sizes`, `priority` (heroes), `fill` + `aspect-ratio` cuando aplique.
10. **Schema.org microdata** en header (`itemScope itemType Organization`).

### 8.2 Keywords objetivo

- "sell my Memphis house fast"
- "cash home buyer Memphis TN"
- "sell house without agent Memphis"
- "we buy houses Memphis"
- Variaciones locales: Berclair, Raleigh, Frayser, Hickory Hill, Cordova, Whitehaven

### 8.3 Estructura JSON-LD por página

| Página | Schemas |
|---|---|
| Home (`/`) | `WebSite`, `Organization` |
| Get Cash Offer (`/get-a-cash-offer-today/`) | `WebPage`, `BreadcrumbList`, `LocalBusiness`, `Review`, `AggregateRating` |
| Futuras páginas | `WebPage`, `BreadcrumbList` + schemas relevantes |

---

## 9. Accesibilidad (a11y)

1. **`aria-hidden="true"`** en todos los iconos decorativos.
2. **`aria-label`** en links de teléfono, redes sociales y acciones sin texto visible.
3. **`aria-labelledby`** en secciones.
4. **`role="alert"`** en errores de formulario.
5. **`role="status"` + `aria-live="polite"`** en mensajes de éxito.
6. **Focus visible:** `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]` en links/botones interactivos.
7. **Contraste:** Texto blanco sobre navy cumple WCAG AA. Texto `#0f0f23` sobre amber cumple WCAG AAA.
8. **Skip links / landmarks:** El header usa `<header>`, las secciones `<section>`, el footer `<footer>`, el contenido `<main>`.

---

## 10. Convenciones de Código

### Nombrado

| Tipo | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `CallNowBanner`, `LeadFormConsent` |
| Archivos de componente | kebab-case | `call-now-banner.tsx`, `lead-form-consent.tsx` |
| Utilidades | camelCase | `cn()` |
| Constantes | UPPER_SNAKE_CASE | `SITE_URL`, `SITE_NAME` |
| CSS classes | Tailwind utilities (sin CSS custom) | — |

### Estructura de un componente de sección

```tsx
// 1. Imports
import { Icon } from "lucide-react"

// 2. Data (si es estática)
const items = [...]

// 3. Sub-componentes internos (si aplica)
function ItemCard({ ... }) { ... }

// 4. Componente principal exportado
export function SectionName() {
    return (
        <section id="section-id" className="bg-[#0f0f23] py-20 lg:py-28" aria-labelledby="section-heading">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Badge */}
                {/* Heading */}
                {/* Content */}
            </div>
        </section>
    )
}
```

### Props para componentes reutilizables

- Usar `interface` nombrada: `interface CallNowBannerProps { ... }`.
- Valores por defecto con destructuring: `{ heading = "Default" }: Props`.
- No usar `React.FC` — preferir funciones con tipo de retorno implícito.

---

## 11. Información Constante del Negocio

Estos valores son constantes y deben referenciarse de forma consistente:

```ts
const PHONE_NUMBER = "(901) 621-8799"
const PHONE_TEL    = "tel:+19016218799"
const SITE_URL     = "https://www.spencerbuyshouses.com"
const SITE_NAME    = "SpencerBuysHouses.com"
const BUSINESS     = "Spencer Buys Houses"
const LOCATION     = "Memphis, TN"

const SERVICE_AREAS = [
    "Memphis", "Berclair", "Raleigh", "Frayser",
    "Hickory Hill", "Cordova", "Whitehaven",
    "East Memphis", "Millington", "Bartlett",
    "Arlington", "Somerville"
]

const SOCIAL_LINKS = {
    facebook:  "https://www.facebook.com/spencerbuyshouses",
    instagram: "https://www.instagram.com/spen.cershadrach",
    linkedin:  "https://www.linkedin.com/in/spencer-shadrach-0a379b4a",
    pinterest: "https://mx.pinterest.com/spencerbuyshouses",
    youtube:   "https://www.youtube.com/@spencerbuyshouses",
    google:    "https://www.google.com/search?...&q=Spencer+Buys+Houses",
}
```

---

## 12. Flujo de Trabajo para Nuevas Páginas

1. Crear `app/<slug>/page.tsx` con `metadata` estática y JSON-LD.
2. Incluir `<StickyHeader />` y `<SiteFooter />` (importar desde `@/components/layout`).
3. Componer el `<main>` con secciones reutilizables de `@/components/sections`.
4. Si se necesita un CTA con teléfono → usar `<CallNowBanner />` con props.
5. Si se necesita un formulario → usar `<LeadForm />` o `<LeadFormConsent />`.
6. Verificar que solo hay un `<h1>`, que cada sección tiene `aria-labelledby`, y que el HTML exportado contiene todo el contenido estático.

---

## 13. Checklist antes de entregar código

- [ ] ¿El componente es Server Component? Si no necesita `useState`/`useEffect`/Framer Motion, debe serlo.
- [ ] ¿Existe ya un componente que haga esto? Buscar en `components/` antes de crear uno nuevo.
- [ ] ¿Los colores usan los hex del design system? (`#0f0f23`, `#13132b`, `#f59e0b`, etc.)
- [ ] ¿Hay `aria-labelledby` en la sección y `aria-hidden` en iconos decorativos?
- [ ] ¿El JSON-LD y metadata están presentes y correctos?
- [ ] ¿Solo hay un `<h1>` en la página?
- [ ] ¿Las imágenes usan `<Image>` de Next.js con `alt`, `sizes` y `priority` cuando corresponde?
- [ ] ¿TypeScript strict compila sin errores?
- [ ] ¿El barrel export (`index.ts`) está actualizado si se añadió un componente nuevo?

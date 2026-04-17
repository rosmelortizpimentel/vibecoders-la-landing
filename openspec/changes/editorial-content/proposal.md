# Proposal: Editorial Content Pages (Blog, Charlas, Glosario)

## Intent
Implementar las páginas de contenido editorial (Blog, Charlas y Glosario) para atraer y educar a la comunidad. Este contenido fortalecerá el SEO y aportará valor mediante artículos, sesiones grabadas y definiciones de términos clave.

## Scope

### In Scope
- **Blog**: Página de listado (`/blog`) y página de artículo individual (`/blog/[slug]`).
- **Charlas**: Página de listado (`/charlas`) y página de sesión individual (`/charlas/[slug]`).
- **Glosario**: Página de listado (`/glosario`) y página de término individual (`/glosario/[slug]`).
- Creación de 5 artículos de blog, 8 charlas y 15 términos de glosario (reemplazando placeholders).
- Nuevos layouts (`BlogLayout.astro`, `CharlaLayout.astro`) extendiendo `BaseLayout.astro`.
- Nuevos componentes de UI para tarjetas de blog, charlas, información de autor, embed de video y listas.

### Out of Scope
- Páginas `/learn`, `/tools`, `/recursos` (Sprint 1.E).
- Página de precios `/pricing` (Sprint 1.E).
- Embed de videos reales (se usarán placeholders estilo YouTube lite embed).
- Sistema de comentarios (post-MVP).
- Funcionalidad de búsqueda (post-MVP).

## Capabilities

### New Capabilities
- `blog-pages`: Visualización de listado y detalle de artículos de blog.
- `charlas-pages`: Visualización de listado y detalle de sesiones en vivo/grabadas.
- `glosario-pages`: Visualización de listado alfabético/categorizado y detalle de términos.

### Modified Capabilities
- None

## Approach
Se utilizará Astro Content Collections con el esquema ya definido en `src/content.config.ts`.
Las páginas de listado (`/blog`, `/charlas`, `/glosario`) utilizarán el `DirectoryLayout` existente (fondo blanco).
Las páginas de detalle (`/blog/[slug]`, `/charlas/[slug]`) utilizarán nuevos layouts con un Hero oscuro (Absolute Black) y área de contenido clara, alternando como un tablero de ajedrez según el sistema de diseño de Renault.
Todo el texto orientado al usuario utilizará tuteo internacional (ej. "Únete", "Descubre").
Todos los CTAs que requieran acción de plataforma redirigirán a `app.vibecoders.la` con el parámetro `ref`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/blog/` | New | Páginas de listado y detalle de blog |
| `src/pages/charlas/` | New | Páginas de listado y detalle de charlas |
| `src/pages/glosario/` | New | Páginas de listado y detalle de glosario |
| `src/layouts/` | New | `BlogLayout.astro`, `CharlaLayout.astro` |
| `src/components/` | New | Componentes de UI para tarjetas, autores, video, y tags |
| `src/content/` | Modified | Reemplazo de placeholders por archivos MDX reales |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Inconsistencia en el tono (voseo vs tuteo) | Medium | Revisión estricta de todo el contenido MDX generado para asegurar tuteo internacional. |
| Inconsistencia visual de componentes | Low | Reutilizar tokens de Tailwind y seguir diseño de Renault (0px radius, alternancia light/dark). |
| Rendimiento de carga de imágenes | Low | Usar el componente `<Image />` de Astro para optimización automática. |

## Rollback Plan
Revertir el commit que introduce las nuevas carpetas en `src/pages/` y `src/content/`, eliminando las colecciones generadas y restaurando los placeholders.

## Dependencies
- Esquemas de Content Collections (`src/content.config.ts`) ya definidos.
- Sistema de diseño de Renault (`DESIGN.md`).

## Success Criteria
- [ ] Rutas `/blog`, `/charlas` y `/glosario` cargan correctamente mostrando grids de contenido.
- [ ] Rutas individuales renderizan correctamente el contenido MDX con estilos prose (máx 72ch).
- [ ] Todo el texto está en español neutro (tuteo).
- [ ] El diseño cumple con el sistema (0px border-radius, fondos de alto contraste, CTAs redirigiendo a app.vibecoders.la).
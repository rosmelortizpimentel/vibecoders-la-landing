# Proposal: Complementary Pages

## Intent
Completar la estructura del sitio público con páginas complementarias esenciales para la adquisición de usuarios, SEO y demostración de valor: rutas de aprendizaje, directorio de herramientas, recursos descargables, página de precios y vistas simuladas (mock) para futuras funcionalidades de la plataforma.

## Scope

### In Scope
- **Ruta de Aprendizaje**: `/learn` (índice) y `/learn/[slug]` (5 módulos progresivos en MDX).
- **Directorio de Herramientas**: `/tools` (grid de 5 herramientas) y `/tools/[slug]` (reviews en MDX con placeholders de logos SVG).
- **Recursos**: `/recursos` (directorio) y `/recursos/[slug]` (2 recursos iniciales en MDX).
- **Pricing**: `/pricing` (tabla comparativa y FAQ).
- **Páginas Mock**: `/showcase/2026` (ranking), `/mapa` (distribución geográfica simplificada), `/construido-en-publico` (feed de actualizaciones).
- **Datos y Tipos Mock**: `showcase-2026.json`, `map-locations.json`, `build-updates.json` y sus interfaces asociadas (`showcase.ts`, `map.ts`, `build-update.ts`).

### Out of Scope
- Visualización de mapa interactivo real con Mapbox/Leaflet (Fase 2 o post-MVP).
- Integración con base de datos en Supabase para estas páginas mock.
- Interactividad compleja en el cliente (ej. búsqueda dinámica).

## Capabilities

### New Capabilities
- `learning-paths`: Rutas para módulos de aprendizaje y listado `/learn`.
- `tools-directory`: Directorio de herramientas recomendadas y reviews `/tools`.
- `resources-library`: Biblioteca de recursos descargables `/recursos`.
- `pricing-page`: Página de precios estática `/pricing`.
- `mock-views`: Vistas simuladas estáticas para showcase, mapa y feed público.

### Modified Capabilities
- None

## Approach
Utilizar las colecciones de contenido (`learn`, `tools`, `recursos`) de Astro para renderizar páginas estáticas empleando `DirectoryLayout` y `BaseLayout`. Se aplicará un diseño alternado de "luz/oscuridad" siguiendo el Renault Design System ("Absolute Black" y "Pure White"). Los CTAs primarios usarán "Renault Yellow" (máximo 1 por página) o el sistema blanco/negro base, siempre con 0px de border-radius y redirección a `app.vibecoders.la?ref=...`. Los datos mock se consumirán desde archivos JSON estáticos en `src/data/`. El lenguaje empleado en MDX y UI será estrictamente español neutro (tuteo), evitando el voseo argentino.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/learn/` | New | Listado y detalle de módulos de aprendizaje |
| `src/pages/tools/` | New | Directorio y detalle de herramientas |
| `src/pages/recursos/` | New | Biblioteca de recursos descargables |
| `src/pages/pricing.astro` | New | Página de precios y FAQ |
| `src/pages/showcase/2026.astro` | New | Ranking de apps mock |
| `src/pages/mapa.astro` | New | Distribución de builders mock |
| `src/pages/construido-en-publico.astro`| New | Feed de actualizaciones mock |
| `src/content/` | New | Archivos MDX para learn (5), tools (5) y recursos (2) |
| `src/data/` | New | Archivos JSON de datos mock |
| `src/types/` | New | Interfaces TypeScript para los JSON |
| `src/components/` | New | Tarjetas, tablas y componentes UI específicos de cada ruta |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Inconsistencia de diseño | Medium | Reutilizar `DirectoryLayout` y directrices de UI existentes en el proyecto |
| Voseo en contenidos | Medium | Prestar máxima atención a los prompts y revisar textos en español neutro (tuteo) |

## Rollback Plan
Eliminar los archivos añadidos en `src/pages/`, `src/content/`, `src/data/`, `src/types/` y `src/components/` correspondientes a este sprint, revirtiendo el enrutamiento.

## Dependencies
- Colecciones de contenido en `src/content.config.ts` (ya configuradas).
- `DirectoryLayout.astro` y `BaseLayout.astro`.

## Success Criteria
- [ ] Todas las 7 nuevas rutas principales renderizan correctamente con sus subrutas dinámicas.
- [ ] Todos los textos (incluyendo los MDX de muestra) están en español neutro (tuteo).
- [ ] Los CTAs redirigen a la app con el query param `?ref=`.
- [ ] Se cumple estrictamente el diseño UI (sin bordes redondeados en botones, colores correctos).
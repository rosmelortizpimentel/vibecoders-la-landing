# Tasks: Complementary Pages

## Phase 1: Types & Mock Data
- [ ] 1.1 Crear archivo `src/types/showcase.ts` con interfaces para representar entradas del ranking de aplicaciones.
- [ ] 1.2 Crear archivo `src/types/map.ts` con interfaces para detallar locaciones de desarrolladores.
- [ ] 1.3 Crear archivo `src/types/build-update.ts` con interfaces para entradas del feed de progreso.
- [ ] 1.4 Crear `src/data/showcase-2026.json` definiendo un listado de al menos 3 proyectos de prueba simulando el tipado de showcase.
- [ ] 1.5 Crear `src/data/map-locations.json` definiendo al menos 5 puntos geográficos simulados.
- [ ] 1.6 Crear `src/data/build-updates.json` definiendo al menos 5 posteos simulados para alimentar el feed de desarrollo en público.

## Phase 2: Components
- [ ] 2.1 Desarrollar `src/components/learn/ModuleCard.astro` para renderizar el sumario de un módulo en la vista `/learn`.
- [ ] 2.2 Desarrollar `src/components/tools/ToolCard.astro` para renderizar tarjetas de herramientas en la vista `/tools`.
- [ ] 2.3 Desarrollar `src/components/recursos/ResourceCard.astro` para presentar ítems del directorio en la vista `/recursos`.
- [ ] 2.4 Desarrollar `src/components/pricing/PricingTable.astro` que ensamble la estructura de columnas o filas comparativas.
- [ ] 2.5 Desarrollar `src/components/pricing/FAQSection.astro` para listar preguntas frecuentes desplegables o en lista plana.
- [ ] 2.6 Desarrollar `src/components/mock/ShowcaseCard.astro` para mostrar el proyecto simulado en `/showcase/2026`.
- [ ] 2.7 Desarrollar `src/components/mock/UpdateFeedItem.astro` para cada publicación estática en `/construido-en-publico`.

## Phase 3: MDX Content
- [ ] 3.1 Crear 5 archivos MDX válidos en `src/content/learn/` (ej. `intro.mdx`, `componentes.mdx`) asegurando cumplir con las propiedades requeridas en el `schema` de `content.config.ts`.
- [ ] 3.2 Crear 5 archivos MDX válidos en `src/content/tools/` (ej. `cursor.mdx`, `supabase.mdx`) asegurando cumplir con el `schema` correspondiente.
- [ ] 3.3 Crear 2 archivos MDX válidos en `src/content/recursos/` (ej. `guia-seo.mdx`, `plantilla-base.mdx`) asegurando cumplir con el `schema` correspondiente.
- *Atención: El tono de todos estos textos debe ser obligatoriamente en español neutro (tuteo).*

## Phase 4: Pages
- [ ] 4.1 Crear vista índice `src/pages/learn/index.astro` utilizando la colección `learn` y `DirectoryLayout`.
- [ ] 4.2 Crear vista de detalle `src/pages/learn/[slug].astro` empleando `getStaticPaths`.
- [ ] 4.3 Crear vista índice `src/pages/tools/index.astro` utilizando la colección `tools`.
- [ ] 4.4 Crear vista de detalle `src/pages/tools/[slug].astro` empleando `getStaticPaths`.
- [ ] 4.5 Crear vista índice `src/pages/recursos/index.astro` utilizando la colección `recursos`.
- [ ] 4.6 Crear vista de detalle `src/pages/recursos/[slug].astro` empleando `getStaticPaths`.
- [ ] 4.7 Crear vista estática `src/pages/pricing.astro` que importe `PricingTable` y `FAQSection`.
- [ ] 4.8 Crear vista mock `src/pages/showcase/2026.astro` mapeando `showcase-2026.json`.
- [ ] 4.9 Crear vista mock `src/pages/mapa.astro` mapeando `map-locations.json`.
- [ ] 4.10 Crear vista mock `src/pages/construido-en-publico.astro` mapeando `build-updates.json`.

## Phase 5: Verification
- [ ] 5.1 Realizar revisión manual en componentes y rutas para confirmar uso de español neutro (tuteo) y descartar usos accidentales de voseo.
- [ ] 5.2 Validar que todos los Action Buttons redirijan correctamente usando `app.vibecoders.la?ref=[origen]` y preserven bordes rectos (0px radius).
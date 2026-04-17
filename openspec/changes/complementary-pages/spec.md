# Spec: Complementary Pages

## Requirements

### Módulos de Aprendizaje
- **REQ-001**: La ruta `/learn` debe listar todos los módulos de la colección `learn` ordenados por `moduleNumber`.
- **REQ-002**: La ruta `/learn/[slug]` debe renderizar el contenido MDX del módulo utilizando `getStaticPaths` sobre la colección `learn`.
- **REQ-003**: El diseño de `/learn` debe usar `DirectoryLayout` alternando tarjetas en modo claro/oscuro, siguiendo el Renault Design System.

### Directorio de Herramientas
- **REQ-004**: La ruta `/tools` debe mostrar un grid o listado con las herramientas de la colección `tools`.
- **REQ-005**: La ruta `/tools/[slug]` debe mostrar el detalle y la review en MDX de cada herramienta utilizando `getStaticPaths`.
- **REQ-006**: Las tarjetas de herramientas en `/tools` deben incluir información clave como la categoría y el modelo de `pricing`.

### Recursos Descargables
- **REQ-007**: La ruta `/recursos` debe mostrar el directorio de la colección `recursos`.
- **REQ-008**: La ruta `/recursos/[slug]` debe renderizar el contenido MDX y destacar el enlace `downloadUrl` a través de un botón principal.

### Precios (Pricing)
- **REQ-009**: La ruta `/pricing` debe ser estática y mostrar una tabla comparativa de planes.
- **REQ-010**: La vista `/pricing` debe incluir una sección de preguntas frecuentes (FAQ).
- **REQ-011**: Los botones de acción principales en `/pricing` deben usar `CTAButton` y redirigir siempre a `app.vibecoders.la?ref=pricing`.

### Páginas Mock (Showcase, Mapa, Feed)
- **REQ-012**: La ruta `/showcase/2026` debe consumir datos de `src/data/showcase-2026.json` (tipado con `src/types/showcase.ts`) para mostrar un ranking de aplicaciones.
- **REQ-013**: La ruta `/mapa` debe consumir `src/data/map-locations.json` (tipado con `src/types/map.ts`) simulando una distribución geográfica en una vista estática.
- **REQ-014**: La ruta `/construido-en-publico` debe consumir `src/data/build-updates.json` (tipado con `src/types/build-update.ts`) estructurado como un feed vertical de actualizaciones.

### Restricciones Generales y Estilo
- **REQ-015**: Todo el texto visible, incluyedo el mock data y archivos MDX, debe estar redactado en español neutro (tuteo). Se prohíbe explícitamente el uso del voseo.
- **REQ-016**: No se debe implementar interactividad compleja del lado del cliente en las páginas mock; el foco es exclusivamente estático y demostrativo.
- **REQ-017**: Se debe mantener coherencia con el diseño base de componentes UI ya establecidos, como `CTAButton`, asegurando 0px de border-radius en las interacciones principales.

## Scenarios

### SC-001: Navegación por módulos de aprendizaje
- **Given** que un usuario visita `/learn`
- **When** hace clic en el módulo "Fundamentos de VibeCoding"
- **Then** es redirigido a `/learn/fundamentos`
- **And** visualiza el contenido MDX renderizado adecuadamente junto a la duración y resultados esperados.

### SC-002: Acceso a un recurso descargable
- **Given** que un usuario está leyendo sobre un recurso en `/recursos/prompt-arquitectura`
- **When** revisa el contenido de la página
- **Then** identifica fácilmente el botón de descarga
- **And** al interactuar, es dirigido correctamente a la URL externa provista en el MDX.

### SC-003: Visualización y elección de plan en Pricing
- **Given** que un usuario visita `/pricing`
- **When** compara los beneficios de los diferentes planes
- **Then** puede revisar las respuestas a dudas comunes en la sección de FAQ
- **And** al seleccionar un plan, la redirección agrega el parámetro `?ref=pricing` para trazabilidad en la plataforma destino.

### SC-004: Lectura del feed de Construido en Público
- **Given** que un usuario ingresa a `/construido-en-publico`
- **When** se desplaza hacia abajo por la página
- **Then** encuentra un flujo estático cronológico de actualizaciones mock basadas fielmente en la estructura del JSON definido.

### SC-005: Exploración del Showcase
- **Given** que un usuario visita `/showcase/2026`
- **When** analiza los proyectos presentados
- **Then** visualiza tarjetas renderizadas con la información preestablecida (métricas, creadores, estado) proveniente del JSON, sin requerir acceso a la base de datos real.
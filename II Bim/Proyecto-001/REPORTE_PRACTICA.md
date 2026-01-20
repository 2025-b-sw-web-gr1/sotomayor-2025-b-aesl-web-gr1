# Informe de Práctica: Documentación de APIs con Swagger en NestJS

## 1. Desarrollo de la Práctica

El desarrollo de esta práctica se centró en la implementación y documentación de una API RESTful utilizando NestJS, TypeORM y SQLite, con el objetivo principal de integrar Open API (Swagger) para la documentación automática.

Los pasos realizados fueron:

1.  **Configuración del Entorno**:
    - Se inicializó un nuevo proyecto NestJS (`Proyecto-001`).
    - Se instalaron las dependencias necesarias: `@nestjs/typeorm`, `typeorm`, `sqlite3` para la persistencia de datos, y `@nestjs/swagger`, `swagger-ui-express` para la documentación.

2.  **Modelado de Datos (Entities)**:
    - Se definieron dos entidades principales: `Team` (Equipo) y `Player` (Jugador).
    - Se estableció una relación **uno a muchos (1:N)**: Un equipo tiene muchos jugadores, y un jugador pertenece a un equipo.
    - Se utilizaron decoradores de TypeORM (`@Entity`, `@Column`, `@OneToMany`, `@ManyToOne`) para mapear estas estructuras a la base de datos SQLite.

3.  **Implementación de la Lógica (Services & Controllers)**:
    - Se generaron módulos, controladores y servicios para `Teams` y `Players`.
    - Se implementaron los métodos CRUD (Create, Read, Update, Delete) en los servicios, interactuando con la base de datos a través de Repositorios.
    - Se creó un endpoint específico `GET /teams/:id/players` para consultar la relación.

4.  **Integración de Swagger**:
    - Se configuró el `DocumentBuilder` en el archivo `main.ts` para inicializar Swagger en la ruta `/api`.
    - Se decoraron los Controladores con `@ApiTags` para agrupar los endpoints.
    - Se decoraron los métodos con `@ApiOperation` (descripción) y `@ApiResponse` (códigos de estado esperados).
    - Se documentaron los DTOs (`CreateTeamDto`, `CreatePlayerDto`) usando `@ApiProperty` para mostrar ejemplos de los datos requeridos en la interfaz gráfica.

5.  **Validación**:
    - Se añadieron validaciones globales (`ValidationPipe`) y decoradores `class-validator` para asegurar la integridad de los datos de entrada.

## 2. Análisis de Resultados

Tras la implementación, se realizaron pruebas funcionales accediendo a la interfaz de Swagger UI en `http://localhost:3000/api`.

- **Accesibilidad**: La interfaz de usuario de Swagger se cargó correctamente, mostrando todos los endpoints agrupados por "teams" y "players".
- **Funcionalidad CRUD**: Se verificó la correcta creación, lectura, actualización y eliminación de registros directamente desde el navegador.
  - Al crear un equipo, el servidor respondió con código `201 Created`.
  - Al consultar el listado, se obtuvo un JSON con la estructura esperada.
- **Relaciones**: Se confirmó que al crear jugadores asociados a un `teamId`, la base de datos respeta la relación foránea. El endpoint `/teams/:id/players` devolvió correctamente la lista de jugadores pertenecientes a ese equipo.
- **Documentación Interactiva**: Los ejemplos definidos en los DTOs aparecieron precargados en los formularios de prueba, facilitando el envío de peticiones sin necesidad de escribir el JSON manualmente.

## 3. Conclusiones

- **Automatización Eficiente**: La integración de Swagger en NestJS permite generar documentación viva y siempre actualizada con un esfuerzo mínimo, utilizando decoradores directamente en el código fuente. Esto elimina la discrepancia entre la documentación y la implementación real.
- **Mejora en el Testing**: Swagger UI actúa como una herramienta potente para pruebas rápidas, reemplazando en muchos casos la necesidad de herramientas externas como Postman para verificaciones básicas, lo que agiliza el ciclo de desarrollo.
- **Estandarización**: El uso de DTOs junto con los decoradores de API proporciona una definición clara de los contratos de la API (Request/Response), lo cual es crucial para que otros desarrolladores o equipos de frontend puedan consumir los servicios sin ambigüedades.

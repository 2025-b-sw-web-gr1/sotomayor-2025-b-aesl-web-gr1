# Examen Web Endpoint RESTful

## Descripción

API RESTful desarrollada en NestJS, conectada a una base de datos SQLite mediante TypeORM. El sistema gestiona equipos de fútbol y sus jugadores, implementando una relación de uno a muchos (un Equipo tiene muchos Jugadores).

Incluye documentación interactiva con Swagger.

## Tecnologías

- NestJS
- TypeORM
- SQLite
- Swagger

## Instalación

```bash
npm install
```

## Correr el servidor

```bash
npm run start:dev
```

El servidor estará corriendo en: `http://localhost:3000`

## Documentación API (Swagger)

Puedes ver y probar los endpoints interactuando con la documentación generada automáticamente en:

[http://localhost:3000/api](http://localhost:3000/api)

## Endpoints Principales

### Equipos (Teams)

| Método | Endpoint             | Descripción                              |
| :----- | :------------------- | :--------------------------------------- |
| GET    | `/teams`             | Obtener todos los equipos                |
| GET    | `/teams/:id`         | Obtener un equipo por ID                 |
| POST   | `/teams`             | Crear un nuevo equipo                    |
| PUT    | `/teams/:id`         | Actualizar un equipo existente           |
| DELETE | `/teams/:id`         | Eliminar un equipo                       |
| GET    | `/teams/:id/players` | Obtener todos los jugadores de un equipo |

### Jugadores (Players)

| Método | Endpoint       | Descripción                     |
| :----- | :------------- | :------------------------------ |
| GET    | `/players`     | Obtener todos los jugadores     |
| GET    | `/players/:id` | Obtener un jugador por ID       |
| POST   | `/players`     | Crear un nuevo jugador          |
| PUT    | `/players/:id` | Actualizar un jugador existente |
| DELETE | `/players/:id` | Eliminar un jugador             |

## Ejemplos de Uso (cURL)

### Teams

**Obtener todos los equipos**

```bash
curl -X GET http://localhost:3000/teams
```

**Crear un equipo**

```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Team A", "country": "Ecuador"}'
```

### Players

**Crear un jugador**

```bash
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Player 1", "position": "Delantero", "teamId": 1}'
```

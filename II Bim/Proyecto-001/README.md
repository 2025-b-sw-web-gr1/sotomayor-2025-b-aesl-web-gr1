# Documentación de Endpoints con Swagger (Proyecto 001)

Este proyecto implementa una API RESTful para gestionar Equipos y Jugadores, documentada automáticamente con **Swagger (OpenAPI)** usando NestJS.

## 📋 Requisitos Previos

- Node.js (v16 o superior recomendado)
- npm

## 🚀 Instalación

1.  Clonar el repositorio o navegar a la carpeta del proyecto.
2.  Instalar las dependencias:

```bash
npm install
```

## 🏃 Ejecución

Para correr el servidor en modo desarrollo:

```bash
npm run start:dev
```

El servidor iniciará en `http://localhost:3000`.

## 📘 Acceso a la Documentación (Swagger)

Una vez que el servidor esté corriendo, accede a la documentación interactiva en:

👉 **http://localhost:3000/api**

Aquí podrás ver todos los endpoints disponibles, sus esquemas (DTOs) y probar las peticiones directamente.

## 📡 Endpoints Implementados

### Teams (Equipos)

- `GET /teams`: Obtener todos los equipos.
- `GET /teams/:id`: Obtener un equipo por ID.
- `POST /teams`: Crear un nuevo equipo.
- `PUT /teams/:id`: Actualizar un equipo existente.
- `DELETE /teams/:id`: Eliminar un equipo.
- `GET /teams/:id/players`: Obtener los jugadores de un equipo específico.

### Players (Jugadores)

- `GET /players`: Obtener todos los jugadores.
- `GET /players/:id`: Obtener un jugador por ID.
- `POST /players`: Crear un nuevo jugador (requiere `teamId`).
- `PUT /players/:id`: Actualizar un jugador.
- `DELETE /players/:id`: Eliminar un jugador.

## 🛠️ Tecnologías Usadas

- **NestJS**: Framework de Node.js.
- **TypeORM**: ORM para base de datos (relación 1:N entre Teams y Players).
- **SQLite**: Base de datos ligera (archivo `database.sqlite`).
- **Swagger (@nestjs/swagger)**: Generación de documentación API.

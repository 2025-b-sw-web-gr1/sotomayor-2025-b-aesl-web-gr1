# 📚 Documentación API RESTful - Equipos y Jugadores de Fútbol

## 👥 Proyecto Estudiantil
**Materia:** Aplicaciones Web  
**Tema:** Diseño y Documentación de APIs RESTful (Relación 1 a Muchos)  
**Ejemplo:** Un equipo de fútbol tiene muchos jugadores

---

## 📖 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Arquitectura RESTful](#arquitectura-restful)
3. [Modelo de Datos](#modelo-de-datos)
4. [Endpoints](#endpoints)
5. [Uso de la Documentación](#uso-de-la-documentación)
6. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🎯 Introducción

Este proyecto documenta una API RESTful que gestiona equipos de fútbol y sus jugadores, demostrando una relación **1 a muchos** (one-to-many):
- **1 Equipo** → **Muchos Jugadores**
- Cada jugador pertenece a un solo equipo

### Tecnologías Utilizadas
- **OpenAPI 3.0** (Swagger) para documentación
- **Bruno** como cliente HTTP para testing
- **JSON** como formato de intercambio de datos

---

## 🏗️ Arquitectura RESTful

### Principios REST Aplicados

#### ✅ 1. Uso de Métodos HTTP Estándar
| Método | Operación | Descripción |
|--------|-----------|-------------|
| `GET` | Read | Obtener recursos |
| `POST` | Create | Crear nuevos recursos |
| `PUT` | Update | Actualizar recursos completos |
| `DELETE` | Delete | Eliminar recursos |

#### ✅ 2. URLs Basadas en Recursos
```
/teams          → Colección de equipos
/teams/{id}     → Equipo específico
/players        → Colección de jugadores
/players/{id}   → Jugador específico
/teams/{id}/players → Jugadores de un equipo (relación)
```

#### ✅ 3. Stateless (Sin Estado)
Cada petición contiene toda la información necesaria para ser procesada.

#### ✅ 4. Códigos de Estado HTTP
- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado
- `204 No Content` - Eliminación exitosa
- `400 Bad Request` - Datos inválidos
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

---

## 🗂️ Modelo de Datos

### Entidad: Team (Equipo)
```json
{
  "id": 1,
  "name": "Barcelona FC",
  "country": "España",
  "founded": 1899,
  "stadium": "Camp Nou"
}
```

**Campos:**
- `id` (integer): Identificador único autogenerado
- `name` (string, requerido): Nombre del equipo (3-100 caracteres)
- `country` (string, requerido): País del equipo (3-50 caracteres)
- `founded` (integer, opcional): Año de fundación (1800-2100)
- `stadium` (string, opcional): Nombre del estadio (3-100 caracteres)

### Entidad: Player (Jugador)
```json
{
  "id": 1,
  "name": "Lionel Messi",
  "position": "Delantero",
  "number": 10,
  "age": 36,
  "teamId": 1
}
```

**Campos:**
- `id` (integer): Identificador único autogenerado
- `name` (string, requerido): Nombre completo (3-100 caracteres)
- `position` (string, requerido): Posición en el campo
  - Valores permitidos: `Portero`, `Defensa`, `Mediocampista`, `Delantero`
- `number` (integer, opcional): Número de camiseta (1-99)
- `age` (integer, opcional): Edad del jugador (16-45)
- `teamId` (integer, requerido): ID del equipo al que pertenece

### Relación 1 a Muchos
```
Team (1) ←──────→ (N) Player
   ↑                    ↓
   |                 teamId
   └────────────────────┘
```

---

## 🛣️ Endpoints

### 📌 Equipos (Teams)

#### 1. GET /teams
**Obtener todos los equipos**
```http
GET /teams HTTP/1.1
Host: api.ejemplo.com
```

**Respuesta 200:**
```json
[
  {
    "id": 1,
    "name": "Barcelona FC",
    "country": "España",
    "founded": 1899,
    "stadium": "Camp Nou"
  },
  {
    "id": 2,
    "name": "Real Madrid",
    "country": "España",
    "founded": 1902,
    "stadium": "Santiago Bernabéu"
  }
]
```

#### 2. GET /teams/{id}
**Obtener equipo por ID**
```http
GET /teams/1 HTTP/1.1
Host: api.ejemplo.com
```

**Respuesta 200:**
```json
{
  "id": 1,
  "name": "Barcelona FC",
  "country": "España",
  "founded": 1899,
  "stadium": "Camp Nou"
}
```

#### 3. POST /teams
**Crear nuevo equipo**
```http
POST /teams HTTP/1.1
Host: api.ejemplo.com
Content-Type: application/json

{
  "name": "Barcelona FC",
  "country": "España",
  "founded": 1899,
  "stadium": "Camp Nou"
}
```

**Respuesta 201:**
```json
{
  "id": 1,
  "name": "Barcelona FC",
  "country": "España",
  "founded": 1899,
  "stadium": "Camp Nou"
}
```

#### 4. PUT /teams/{id}
**Actualizar equipo completo**
```http
PUT /teams/1 HTTP/1.1
Host: api.ejemplo.com
Content-Type: application/json

{
  "name": "FC Barcelona",
  "country": "España",
  "founded": 1899,
  "stadium": "Camp Nou Renovado"
}
```

#### 5. DELETE /teams/{id}
**Eliminar equipo**
```http
DELETE /teams/1 HTTP/1.1
Host: api.ejemplo.com
```

**Respuesta:** `204 No Content`

#### 6. GET /teams/{id}/players
**Obtener jugadores de un equipo (Relación 1:N)**
```http
GET /teams/1/players HTTP/1.1
Host: api.ejemplo.com
```

**Respuesta 200:**
```json
[
  {
    "id": 1,
    "name": "Lionel Messi",
    "position": "Delantero",
    "number": 10,
    "age": 36,
    "teamId": 1
  },
  {
    "id": 2,
    "name": "Gerard Piqué",
    "position": "Defensa",
    "number": 3,
    "age": 36,
    "teamId": 1
  }
]
```

### 📌 Jugadores (Players)

#### 1. GET /players
**Obtener todos los jugadores**

#### 2. GET /players/{id}
**Obtener jugador por ID**

#### 3. POST /players
**Crear nuevo jugador**
```json
{
  "name": "Lionel Messi",
  "position": "Delantero",
  "number": 10,
  "age": 36,
  "teamId": 1
}
```

#### 4. PUT /players/{id}
**Actualizar jugador completo**

#### 5. DELETE /players/{id}
**Eliminar jugador**

---

## 📁 Uso de la Documentación

### 1. Swagger (OpenAPI)

**Archivo:** `football-api.yaml`

#### Visualizar en Swagger Editor:
1. Visita: https://editor.swagger.io/
2. Carga el archivo `football-api.yaml`
3. Explora los endpoints interactivamente

#### Visualizar en VS Code:
1. Instala la extensión "Swagger Viewer"
2. Abre `football-api.yaml`
3. Presiona `Shift + Alt + P` (Windows/Linux) o `Shift + Option + P` (Mac)

### 2. Bruno Collection

**Carpeta:** `bruno-collection/`

#### Estructura:
```
bruno-collection/
├── bruno.json                    # Configuración de la colección
├── environments/
│   ├── Production.bru           # Variables de producción
│   └── Local.bru                # Variables de desarrollo local
├── Teams/
│   ├── get-all-teams.bru
│   ├── get-team-by-id.bru
│   ├── create-team.bru
│   ├── update-team.bru
│   ├── delete-team.bru
│   └── get-players-by-team.bru
└── Players/
    ├── get-all-players.bru
    ├── get-player-by-id.bru
    ├── create-player.bru
    ├── update-player.bru
    └── delete-player.bru
```

#### Usar con Bruno:
1. Descarga Bruno: https://www.usebruno.com/
2. Abre Bruno
3. Selecciona "Open Collection"
4. Navega a la carpeta `bruno-collection/`
5. Selecciona el ambiente (Local o Production)
6. Ejecuta las peticiones

#### Variables de Entorno:
- **Production:** `https://api.ejemplo.com/v1`
- **Local:** `http://localhost:3000/v1`

---

## 🚀 Ejemplos de Uso

### Flujo Completo: Crear Equipo y Agregar Jugadores

#### Paso 1: Crear un Equipo
```http
POST /teams
Content-Type: application/json

{
  "name": "Manchester United",
  "country": "Inglaterra",
  "founded": 1878,
  "stadium": "Old Trafford"
}
```

**Respuesta:**
```json
{
  "id": 3,
  "name": "Manchester United",
  "country": "Inglaterra",
  "founded": 1878,
  "stadium": "Old Trafford"
}
```

#### Paso 2: Crear Jugadores para el Equipo
```http
POST /players
Content-Type: application/json

{
  "name": "Cristiano Ronaldo",
  "position": "Delantero",
  "number": 7,
  "age": 38,
  "teamId": 3
}
```

```http
POST /players
Content-Type: application/json

{
  "name": "Bruno Fernandes",
  "position": "Mediocampista",
  "number": 8,
  "age": 29,
  "teamId": 3
}
```

#### Paso 3: Consultar Jugadores del Equipo
```http
GET /teams/3/players
```

**Respuesta:**
```json
[
  {
    "id": 3,
    "name": "Cristiano Ronaldo",
    "position": "Delantero",
    "number": 7,
    "age": 38,
    "teamId": 3
  },
  {
    "id": 4,
    "name": "Bruno Fernandes",
    "position": "Mediocampista",
    "number": 8,
    "age": 29,
    "teamId": 3
  }
]
```

#### Paso 4: Actualizar un Jugador
```http
PUT /players/3
Content-Type: application/json

{
  "name": "Cristiano Ronaldo",
  "position": "Delantero",
  "number": 7,
  "age": 39,
  "teamId": 3
}
```

#### Paso 5: Eliminar un Jugador
```http
DELETE /players/4
```

**Respuesta:** `204 No Content`

---

## 🎓 Conceptos Aprendidos

### ✅ Principios REST
- Arquitectura cliente-servidor
- Operaciones CRUD con métodos HTTP
- URLs descriptivas basadas en recursos
- Comunicación sin estado (stateless)

### ✅ Relaciones en APIs
- Relación 1 a muchos (one-to-many)
- Endpoints anidados (`/teams/{id}/players`)
- Llaves foráneas (`teamId`)

### ✅ Documentación
- Especificación OpenAPI 3.0
- Esquemas reutilizables (components/schemas)
- Ejemplos de peticiones y respuestas
- Validaciones y restricciones

### ✅ Testing de APIs
- Colecciones organizadas por recursos
- Variables de entorno
- Documentación inline
- Peticiones reutilizables

---

## 📝 Notas Adicionales

### Buenas Prácticas Implementadas
1. ✅ Nombres de recursos en plural (`/teams`, `/players`)
2. ✅ Uso correcto de métodos HTTP
3. ✅ Códigos de estado HTTP apropiados
4. ✅ Validación de datos de entrada
5. ✅ Mensajes de error descriptivos
6. ✅ Versionamiento de API (`/v1`)
7. ✅ Documentación completa y ejemplos

### Posibles Extensiones
- Agregar paginación a las listas (query params: `?page=1&limit=10`)
- Implementar filtros y búsqueda (`?country=España`)
- Agregar ordenamiento (`?sort=name&order=asc`)
- Implementar autenticación (JWT, OAuth)
- Agregar más relaciones (Ej: Coach, Matches, Leagues)

---

## 👨‍💻 Autores
Proyecto desarrollado para la materia **Aplicaciones Web - VII Semestre**

---

## 📄 Licencia
Este proyecto es únicamente con fines educativos.

---

**¡Éxito con tu proyecto! ⚽🎯**

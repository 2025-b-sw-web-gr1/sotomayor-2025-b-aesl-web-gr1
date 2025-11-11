# 💪 Ejercicios Propuestos

## 📋 Instrucciones Generales

Estos ejercicios te ayudarán a consolidar lo aprendido en el taller. Cada ejercicio tiene un nivel de dificultad indicado y una estimación de tiempo.

**Recomendaciones:**
- Resuelve los ejercicios en orden
- Usa Swagger Editor para validar tu trabajo
- Prueba cada endpoint con "Try it out"
- Compara tus soluciones con las respuestas al final

---

## 🌟 Ejercicio 1: Documentar endpoint de Users (Básico)

**Nivel:** ⭐ Básico  
**Tiempo estimado:** 15 minutos

### Objetivo
Documentar el endpoint `GET /users` de JSONPlaceholder.

### Requisitos
1. Crear el path `/users`
2. Documentar el método GET
3. Incluir una respuesta 200 con array de usuarios
4. Definir el schema `User` con las siguientes propiedades:
   - `id` (integer)
   - `name` (string)
   - `username` (string)
   - `email` (string, formato email)
   - `phone` (string)
   - `website` (string)

### Puntos extra
- Agregar descripción detallada
- Incluir un ejemplo de respuesta
- Agregar tag "Users"

### Pista
```yaml
paths:
  /users:
    get:
      # Completa aquí...
```

---

## 🌟 Ejercicio 2: Endpoint con Query Parameters (Intermedio)

**Nivel:** ⭐⭐ Intermedio  
**Tiempo estimado:** 20 minutos

### Objetivo
Documentar `GET /posts` con parámetros de consulta para filtrado.

### Requisitos
1. Agregar parámetro `userId` (query, opcional)
2. Agregar parámetro `_limit` (query, opcional, máximo 100)
3. Agregar parámetro `_start` (query, opcional, para paginación)
4. Documentar respuesta 200 con array de posts
5. Agregar validaciones a los parámetros

### Ejemplo de uso esperado
```
GET /posts?userId=1&_limit=10&_start=0
```

### Validaciones a incluir
- `_limit`: mínimo 1, máximo 100, default 10
- `_start`: mínimo 0, default 0
- `userId`: mínimo 1, máximo 10

---

## 🌟 Ejercicio 3: CRUD Completo para Albums (Intermedio)

**Nivel:** ⭐⭐ Intermedio  
**Tiempo estimado:** 30 minutos

### Objetivo
Documentar operaciones CRUD completas para el recurso `albums`.

### Endpoints a documentar

#### 1. GET /albums
- Listar todos los álbumes
- Parámetro opcional: `userId` (filtrar por usuario)
- Respuesta 200 con array de álbumes

#### 2. GET /albums/{id}
- Obtener un álbum específico
- Parámetro path: `id`
- Respuestas: 200 (éxito), 404 (no encontrado)

#### 3. POST /albums
- Crear un nuevo álbum
- RequestBody con `userId` y `title`
- Respuestas: 201 (creado), 400 (datos inválidos)

#### 4. PUT /albums/{id}
- Actualizar álbum completo
- RequestBody con `userId` y `title`
- Respuestas: 200 (actualizado), 404 (no encontrado)

#### 5. DELETE /albums/{id}
- Eliminar álbum
- Respuestas: 200 o 204 (eliminado), 404 (no encontrado)

### Schema Album
```yaml
Album:
  type: object
  properties:
    userId:
      type: integer
      example: 1
    id:
      type: integer
      example: 1
    title:
      type: string
      example: "quidem molestiae enim"
```

---

## 🌟 Ejercicio 4: Relaciones entre Recursos (Intermedio)

**Nivel:** ⭐⭐ Intermedio  
**Tiempo estimado:** 25 minutos

### Objetivo
Documentar endpoints que muestran relaciones entre recursos.

### Endpoints a implementar

#### 1. GET /users/{id}/posts
- Obtener todos los posts de un usuario específico
- Parámetro path: `id` del usuario
- Respuesta 200 con array de posts

#### 2. GET /users/{id}/albums
- Obtener todos los álbumes de un usuario
- Parámetro path: `id` del usuario
- Respuesta 200 con array de álbumes

#### 3. GET /users/{id}/todos
- Obtener todas las tareas de un usuario
- Parámetro path: `id` del usuario
- Respuesta 200 con array de todos

#### 4. GET /albums/{id}/photos
- Obtener todas las fotos de un álbum
- Parámetro path: `id` del álbum
- Respuesta 200 con array de photos

### Pista
Estos endpoints siguen el patrón REST de recursos anidados.

---

## 🌟 Ejercicio 5: Esquemas Complejos (Avanzado)

**Nivel:** ⭐⭐⭐ Avanzado  
**Tiempo estimado:** 30 minutos

### Objetivo
Crear schemas complejos con objetos anidados para el recurso User.

### Requisitos
Documentar el schema completo de User con:

#### Propiedades principales
- `id`, `name`, `username`, `email`, `phone`, `website`

#### Objeto anidado: `address`
```yaml
address:
  street: "Kulas Light"
  suite: "Apt. 556"
  city: "Gwenborough"
  zipcode: "92998-3874"
  geo:
    lat: "-37.3159"
    lng: "81.1496"
```

#### Objeto anidado: `company`
```yaml
company:
  name: "Romaguera-Crona"
  catchPhrase: "Multi-layered client-server neural-net"
  bs: "harness real-time e-markets"
```

### Tareas
1. Crear schema `User` completo
2. Crear schemas separados para `Address`, `Geo` y `Company`
3. Usar `$ref` para referenciar los schemas anidados
4. Agregar descripciones a cada propiedad
5. Incluir ejemplos apropiados
6. Marcar campos requeridos vs opcionales

### Ejemplo de estructura esperada
```yaml
components:
  schemas:
    User:
      type: object
      required:
        - id
        - name
        - username
        - email
      properties:
        # ... propiedades ...
        address:
          $ref: '#/components/schemas/Address'
        company:
          $ref: '#/components/schemas/Company'
    
    Address:
      # ... definición ...
    
    Geo:
      # ... definición ...
    
    Company:
      # ... definición ...
```

---

## 🌟 Ejercicio 6: Manejo de Errores (Avanzado)

**Nivel:** ⭐⭐⭐ Avanzado  
**Tiempo estimado:** 25 minutos

### Objetivo
Implementar manejo completo de errores para los endpoints.

### Requisitos

#### 1. Crear esquemas de error reutilizables

**Schema Error básico:**
```yaml
Error:
  type: object
  required:
    - message
    - statusCode
  properties:
    message:
      type: string
      example: "Recurso no encontrado"
    statusCode:
      type: integer
      example: 404
    timestamp:
      type: string
      format: date-time
      example: "2025-11-11T10:30:00Z"
    path:
      type: string
      example: "/posts/999"
```

**Schema ValidationError:**
```yaml
ValidationError:
  type: object
  properties:
    message:
      type: string
      example: "Validation failed"
    errors:
      type: array
      items:
        type: object
        properties:
          field:
            type: string
            example: "title"
          message:
            type: string
            example: "Title is required"
```

#### 2. Crear responses reutilizables en components

```yaml
components:
  responses:
    NotFound:
      description: Recurso no encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    BadRequest:
      description: Petición inválida
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ValidationError'
```

#### 3. Aplicar en endpoints

Actualiza al menos 3 endpoints para usar estos responses:
- Usar `$ref: '#/components/responses/NotFound'` para 404
- Usar `$ref: '#/components/responses/BadRequest'` para 400
- Agregar respuesta 500 donde corresponda

---

## 🌟 Ejercicio 7: Documentación de Photos (Intermedio-Avanzado)

**Nivel:** ⭐⭐⭐ Intermedio-Avanzado  
**Tiempo estimado:** 30 minutos

### Objetivo
Documentar completamente el recurso Photos con filtros avanzados.

### Endpoints

#### GET /photos
- Listar todas las fotos
- Parámetros opcionales:
  - `albumId` (filtrar por álbum)
  - `_start` y `_limit` (paginación)
- Headers de respuesta:
  - `X-Total-Count`: número total de fotos
  - `Link`: links de paginación

#### GET /photos/{id}
- Obtener una foto específica
- Incluir respuesta de caché: 304 Not Modified

### Schema Photo
```yaml
Photo:
  type: object
  required:
    - albumId
    - id
    - title
    - url
    - thumbnailUrl
  properties:
    albumId:
      type: integer
      description: ID del álbum al que pertenece
      example: 1
    id:
      type: integer
      description: ID único de la foto
      example: 1
    title:
      type: string
      description: Título de la foto
      example: "accusamus beatae ad facilis"
    url:
      type: string
      format: uri
      description: URL de la imagen completa
      example: "https://via.placeholder.com/600/92c952"
    thumbnailUrl:
      type: string
      format: uri
      description: URL de la miniatura
      example: "https://via.placeholder.com/150/92c952"
```

### Desafío adicional
Agregar headers de respuesta en el endpoint GET:
```yaml
responses:
  '200':
    description: Lista de fotos
    headers:
      X-Total-Count:
        description: Número total de fotos
        schema:
          type: integer
        example: 5000
```

---

## 🌟 Ejercicio 8: Todos con Filtros (Intermedio)

**Nivel:** ⭐⭐ Intermedio  
**Tiempo estimado:** 20 minutos

### Objetivo
Documentar el recurso Todos con múltiples opciones de filtrado.

### Endpoints

#### GET /todos
Parámetros de consulta:
- `userId` (integer): filtrar por usuario
- `completed` (boolean): filtrar por estado completado
- `_limit` (integer): limitar resultados

Ejemplo de uso:
```
GET /todos?userId=1&completed=false&_limit=5
```

#### POST /todos
Crear nueva tarea con campos:
- `userId` (requerido)
- `title` (requerido)
- `completed` (opcional, default: false)

### Schema Todo
```yaml
Todo:
  type: object
  required:
    - userId
    - id
    - title
    - completed
  properties:
    userId:
      type: integer
      example: 1
    id:
      type: integer
      example: 1
    title:
      type: string
      example: "delectus aut autem"
      minLength: 1
      maxLength: 200
    completed:
      type: boolean
      example: false
      default: false
```

---

## 🌟 Ejercicio 9: Parámetros Reutilizables (Avanzado)

**Nivel:** ⭐⭐⭐ Avanzado  
**Tiempo estimado:** 25 minutos

### Objetivo
Crear parámetros reutilizables en la sección components.

### Tarea
Define los siguientes parámetros reutilizables:

```yaml
components:
  parameters:
    UserIdParam:
      name: userId
      in: query
      description: Filtrar por ID de usuario
      schema:
        type: integer
        minimum: 1
        maximum: 10
      example: 1
    
    PageParam:
      name: _page
      in: query
      description: Número de página
      schema:
        type: integer
        minimum: 1
        default: 1
      example: 1
    
    LimitParam:
      name: _limit
      in: query
      description: Elementos por página
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 10
      example: 10
    
    StartParam:
      name: _start
      in: query
      description: Índice de inicio
      schema:
        type: integer
        minimum: 0
        default: 0
      example: 0
```

Luego, actualiza al menos 3 endpoints para usar estos parámetros con `$ref`:

```yaml
paths:
  /posts:
    get:
      parameters:
        - $ref: '#/components/parameters/UserIdParam'
        - $ref: '#/components/parameters/LimitParam'
```

---

## 🌟 Ejercicio 10: Proyecto Final (Experto)

**Nivel:** ⭐⭐⭐⭐ Experto  
**Tiempo estimado:** 60-90 minutos

### Objetivo
Crear una documentación OpenAPI 3.0 completa para una API ficticia de **Blog Management**.

### Requisitos del Sistema

#### Recursos a documentar:
1. **Articles** (artículos del blog)
2. **Authors** (autores)
3. **Categories** (categorías)
4. **Tags** (etiquetas)

#### Endpoints mínimos requeridos:

**Articles:**
- GET /articles (listar, con paginación y filtros)
- GET /articles/{id}
- POST /articles
- PUT /articles/{id}
- PATCH /articles/{id}
- DELETE /articles/{id}
- GET /articles/{id}/comments

**Authors:**
- GET /authors
- GET /authors/{id}
- GET /authors/{id}/articles
- POST /authors
- PUT /authors/{id}

**Categories:**
- GET /categories
- GET /categories/{id}
- GET /categories/{id}/articles
- POST /categories

**Tags:**
- GET /tags
- POST /tags
- GET /tags/{slug}/articles

#### Schemas requeridos:

**Article:**
- id, title, slug, content, excerpt
- publishedAt (date-time)
- status (enum: draft, published, archived)
- authorId, categoryId
- tags (array)
- featuredImage (URL)

**Author:**
- id, name, email, bio
- avatar (URL)
- socialMedia (objeto con links)
- articleCount

**Category:**
- id, name, slug, description

**Tag:**
- id, name, slug

#### Características avanzadas a incluir:

1. **Paginación completa** con headers `Link` y `X-Total-Count`
2. **Filtros avanzados**:
   - Por fecha (dateFrom, dateTo)
   - Por estado (status)
   - Por autor, categoría, tags
   - Búsqueda por texto (q)
3. **Ordenamiento** (_sort, _order)
4. **Autenticación simulada** (Bearer token)
5. **Manejo completo de errores** (400, 401, 403, 404, 422, 500)
6. **Validaciones detalladas** en schemas
7. **Ejemplos múltiples** en endpoints importantes
8. **Descriptions completas** en todos los elementos
9. **Tags organizados** por recurso
10. **Links entre operaciones** relacionadas

#### Entregables:

1. Archivo `blog-api.yaml` completo y válido
2. Al menos 20 endpoints documentados
3. Mínimo 8 schemas definidos
4. Componentes reutilizables (parameters, responses, schemas)
5. Probado en Swagger UI sin errores

#### Criterios de evaluación:

- ✅ Completitud (40%): Todos los endpoints y schemas
- ✅ Calidad (30%): Descripciones claras, ejemplos útiles
- ✅ Organización (20%): Uso de components y reutilización
- ✅ Validación (10%): Sin errores, pruebas exitosas

---

## 📚 Soluciones

### Solución Ejercicio 1

<details>
<summary>Ver solución completa</summary>

```yaml
paths:
  /users:
    get:
      summary: Obtener todos los usuarios
      description: Retorna la lista completa de usuarios (10 usuarios)
      operationId: getAllUsers
      tags:
        - Users
      responses:
        '200':
          description: Lista de usuarios obtenida exitosamente
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
              examples:
                ejemplo1:
                  summary: Primer usuario
                  value:
                    - id: 1
                      name: "Leanne Graham"
                      username: "Bret"
                      email: "Sincere@april.biz"
                      phone: "1-770-736-8031 x56442"
                      website: "hildegard.org"

components:
  schemas:
    User:
      type: object
      required:
        - id
        - name
        - username
        - email
      properties:
        id:
          type: integer
          description: ID único del usuario
          example: 1
        name:
          type: string
          description: Nombre completo del usuario
          example: "Leanne Graham"
        username:
          type: string
          description: Nombre de usuario
          example: "Bret"
        email:
          type: string
          format: email
          description: Correo electrónico del usuario
          example: "Sincere@april.biz"
        phone:
          type: string
          description: Número de teléfono
          example: "1-770-736-8031 x56442"
        website:
          type: string
          description: Sitio web personal
          example: "hildegard.org"
```
</details>

---

## 💡 Tips para Resolver los Ejercicios

1. **Lee cuidadosamente los requisitos** antes de empezar
2. **Usa Swagger Editor** para validación en tiempo real
3. **Consulta JSONPlaceholder** para ver respuestas reales: `https://jsonplaceholder.typicode.com/users`
4. **Empieza simple** y luego agrega complejidad
5. **Reutiliza componentes** siempre que sea posible
6. **Prueba cada endpoint** con "Try it out"
7. **Compara con ejemplos** anteriores del taller
8. **No te frustres**: la documentación de APIs es iterativa

---

## 🎯 Autoevaluación

Marca los ejercicios completados:

- [ ] Ejercicio 1: Documentar Users (Básico)
- [ ] Ejercicio 2: Query Parameters (Intermedio)
- [ ] Ejercicio 3: CRUD Albums (Intermedio)
- [ ] Ejercicio 4: Relaciones entre Recursos (Intermedio)
- [ ] Ejercicio 5: Esquemas Complejos (Avanzado)
- [ ] Ejercicio 6: Manejo de Errores (Avanzado)
- [ ] Ejercicio 7: Photos con Filtros (Intermedio-Avanzado)
- [ ] Ejercicio 8: Todos con Filtros (Intermedio)
- [ ] Ejercicio 9: Parámetros Reutilizables (Avanzado)
- [ ] Ejercicio 10: Proyecto Final (Experto)

**Objetivo mínimo:** Completar ejercicios 1-4 (nivel intermedio)  
**Objetivo avanzado:** Completar ejercicios 1-8  
**Objetivo experto:** Completar todos los ejercicios incluyendo el proyecto final

---

## 🆘 ¿Necesitas Ayuda?

Si te atascas en algún ejercicio:

1. Revisa la guía práctica: `03-guia-practica.md`
2. Consulta los archivos YAML de ejemplo en `/swagger`
3. Visita la documentación oficial: [OpenAPI Specification](https://swagger.io/specification/)
4. Prueba la API real en: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
5. Consulta con tu instructor o compañeros

---

**¡Mucho éxito con los ejercicios!** 🚀

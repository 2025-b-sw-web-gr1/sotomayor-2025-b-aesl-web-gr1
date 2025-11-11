# 🛠️ Parte 2: Guía Práctica del Taller

## 🎯 Objetivo del Ejercicio Práctico

Documentar los endpoints de **JSONPlaceholder** usando Swagger Editor y generar una interfaz interactiva con Swagger UI.

**Tiempo estimado**: 90-120 minutos

---

## 🧩 Requisitos

Antes de comenzar, asegúrate de tener:

- ✅ Navegador web (Chrome, Firefox, Edge o Safari)
- ✅ Acceso a internet
- ✅ Acceso a [Swagger Editor](https://editor.swagger.io/)
- ✅ Conocimiento básico de JSON y HTTP
- ✅ Material teórico leído (01-teoria.md)

---

## 📌 Paso a Paso Detallado

### **Paso 1: Acceder a Swagger Editor** (5 min)

1. Abre tu navegador web
2. Navega a [https://editor.swagger.io/](https://editor.swagger.io/)
3. Verás el editor dividido en dos paneles:
   - **Izquierda**: Editor YAML/JSON
   - **Derecha**: Vista previa de Swagger UI
4. Borra el contenido de ejemplo que viene por defecto
5. Prepárate para escribir tu primera especificación

**💡 Tip**: El editor valida en tiempo real. Los errores aparecerán en rojo.

---

### **Paso 2: Crear la Estructura Base** (10 min)

Comienza creando la información básica de tu API:

```yaml
openapi: 3.0.0
info:
  title: JSONPlaceholder API
  description: |
    Documentación completa de la API REST de JSONPlaceholder.
    
    Esta API proporciona datos falsos para testing y prototyping.
    No requiere autenticación y simula operaciones CRUD.
    
    **Recursos disponibles:**
    - Posts (publicaciones)
    - Comments (comentarios)
    - Users (usuarios)
    - Albums (álbumes)
    - Photos (fotos)
    - Todos (tareas)
  version: 1.0.0
  contact:
    name: Soporte JSONPlaceholder
    url: https://jsonplaceholder.typicode.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://jsonplaceholder.typicode.com
    description: Servidor de producción
```

**📝 Explicación**:
- `openapi`: Versión de la especificación OpenAPI
- `info`: Metadatos de la API
- `servers`: URLs base donde está disponible la API

**✅ Checkpoint**: Verifica que no haya errores en el panel derecho.

---

### **Paso 3: Documentar el Primer Endpoint GET** (15 min)

Ahora documentaremos el endpoint para obtener todos los posts:

```yaml
paths:
  /posts:
    get:
      summary: Obtener todos los posts
      description: Retorna una lista completa de todos los posts disponibles
      operationId: getAllPosts
      tags:
        - Posts
      responses:
        '200':
          description: Lista de posts obtenida exitosamente
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Post'
              examples:
                ejemplo1:
                  summary: Primeros dos posts
                  value:
                    - userId: 1
                      id: 1
                      title: "sunt aut facere repellat provident"
                      body: "quia et suscipit suscipit recusandae"
                    - userId: 1
                      id: 2
                      title: "qui est esse"
                      body: "est rerum tempore vitae"
        '500':
          description: Error interno del servidor
```

**📝 Explicación de componentes**:
- `summary`: Descripción breve del endpoint
- `operationId`: Identificador único (útil para generar código)
- `tags`: Agrupa endpoints relacionados
- `responses`: Define las posibles respuestas
- `$ref`: Referencia a un esquema reutilizable
- `examples`: Ejemplos de respuestas

**🔍 Prueba**: Haz clic en "Try it out" y "Execute" en el panel derecho.

---

### **Paso 4: Definir el Esquema de Datos** (15 min)

Al final del archivo, añade la sección de componentes:

```yaml
components:
  schemas:
    Post:
      type: object
      required:
        - userId
        - id
        - title
        - body
      properties:
        userId:
          type: integer
          description: ID del usuario que creó el post
          example: 1
        id:
          type: integer
          description: ID único del post
          example: 1
        title:
          type: string
          description: Título del post
          example: "sunt aut facere repellat provident"
          minLength: 1
          maxLength: 255
        body:
          type: string
          description: Contenido completo del post
          example: "quia et suscipit suscipit recusandae"
          minLength: 1
```

**📝 Explicación**:
- `components`: Sección para definir elementos reutilizables
- `schemas`: Modelos de datos
- `required`: Campos obligatorios
- `properties`: Definición de cada campo
- `example`: Valor de ejemplo para cada campo

---

### **Paso 5: Endpoint GET con Parámetro de Ruta** (15 min)

Documenta el endpoint para obtener un post específico:

```yaml
  /posts/{id}:
    get:
      summary: Obtener un post por ID
      description: Retorna un post específico basado en su ID
      operationId: getPostById
      tags:
        - Posts
      parameters:
        - name: id
          in: path
          required: true
          description: ID del post a obtener
          schema:
            type: integer
            minimum: 1
            maximum: 100
          example: 1
      responses:
        '200':
          description: Post encontrado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Post'
        '404':
          description: Post no encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Error interno del servidor
```

**Agrega el esquema de Error en components**:

```yaml
    Error:
      type: object
      properties:
        message:
          type: string
          description: Mensaje de error
          example: "Post no encontrado"
        code:
          type: integer
          description: Código de error
          example: 404
```

**📝 Nuevos conceptos**:
- `parameters`: Define parámetros del endpoint
- `in: path`: Indica que el parámetro está en la URL
- `minimum/maximum`: Validaciones de valores

---

### **Paso 6: Endpoint POST (Crear Recurso)** (20 min)

Documenta cómo crear un nuevo post:

```yaml
    post:
      summary: Crear un nuevo post
      description: Crea un nuevo post y lo retorna con un ID asignado
      operationId: createPost
      tags:
        - Posts
      requestBody:
        required: true
        description: Datos del post a crear
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPost'
            examples:
              ejemplo1:
                summary: Post de ejemplo
                value:
                  userId: 1
                  title: "Mi nuevo post"
                  body: "Contenido del post"
      responses:
        '201':
          description: Post creado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Post'
        '400':
          description: Datos inválidos
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: Error interno del servidor
```

**Agrega el esquema NewPost en components**:

```yaml
    NewPost:
      type: object
      required:
        - userId
        - title
        - body
      properties:
        userId:
          type: integer
          description: ID del usuario que crea el post
          example: 1
        title:
          type: string
          description: Título del post
          example: "Mi nuevo post"
          minLength: 1
          maxLength: 255
        body:
          type: string
          description: Contenido del post
          example: "Contenido detallado del post"
          minLength: 1
```

**📝 Nuevos conceptos**:
- `requestBody`: Define el cuerpo de la petición
- `201 Created`: Código de estado para recursos creados
- `400 Bad Request`: Error de validación

**🧪 Prueba**: Intenta crear un post desde Swagger UI.

---

### **Paso 7: Endpoint PUT (Actualizar Completo)** (15 min)

```yaml
    put:
      summary: Actualizar un post completo
      description: Reemplaza todos los datos de un post existente
      operationId: updatePost
      tags:
        - Posts
      parameters:
        - name: id
          in: path
          required: true
          description: ID del post a actualizar
          schema:
            type: integer
            minimum: 1
          example: 1
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPost'
      responses:
        '200':
          description: Post actualizado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Post'
        '404':
          description: Post no encontrado
        '400':
          description: Datos inválidos
```

---

### **Paso 8: Endpoint PATCH (Actualizar Parcial)** (10 min)

```yaml
    patch:
      summary: Actualizar parcialmente un post
      description: Actualiza solo los campos proporcionados de un post
      operationId: patchPost
      tags:
        - Posts
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
          example: 1
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                  example: "Título actualizado"
                body:
                  type: string
                  example: "Cuerpo actualizado"
      responses:
        '200':
          description: Post actualizado parcialmente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Post'
        '404':
          description: Post no encontrado
```

---

### **Paso 9: Endpoint DELETE** (10 min)

```yaml
    delete:
      summary: Eliminar un post
      description: Elimina permanentemente un post por su ID
      operationId: deletePost
      tags:
        - Posts
      parameters:
        - name: id
          in: path
          required: true
          description: ID del post a eliminar
          schema:
            type: integer
            minimum: 1
          example: 1
      responses:
        '200':
          description: Post eliminado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: "Post eliminado exitosamente"
        '404':
          description: Post no encontrado
        '500':
          description: Error interno del servidor
```

---

### **Paso 10: Documentar Recurso Adicional - Comments** (20 min)

Ahora documenta los endpoints de comentarios:

```yaml
  /comments:
    get:
      summary: Obtener todos los comentarios
      description: Retorna lista completa de comentarios
      operationId: getAllComments
      tags:
        - Comments
      parameters:
        - name: postId
          in: query
          description: Filtrar comentarios por ID de post
          schema:
            type: integer
          example: 1
      responses:
        '200':
          description: Lista de comentarios
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Comment'

  /comments/{id}:
    get:
      summary: Obtener un comentario por ID
      operationId: getCommentById
      tags:
        - Comments
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
          example: 1
      responses:
        '200':
          description: Comentario encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Comment'
        '404':
          description: Comentario no encontrado
```

**Agrega el esquema Comment**:

```yaml
    Comment:
      type: object
      required:
        - postId
        - id
        - name
        - email
        - body
      properties:
        postId:
          type: integer
          description: ID del post al que pertenece
          example: 1
        id:
          type: integer
          description: ID único del comentario
          example: 1
        name:
          type: string
          description: Nombre o título del comentario
          example: "id labore ex et quam laborum"
        email:
          type: string
          format: email
          description: Email del autor del comentario
          example: "Eliseo@gardner.biz"
        body:
          type: string
          description: Contenido del comentario
          example: "laudantium enim quasi est quidem magnam"
```

**📝 Nuevo concepto**:
- `in: query`: Parámetro de consulta (query string)
- `format: email`: Validación de formato de email

---

### **Paso 11: Probar la Documentación** (15 min)

Ahora es momento de probar todo lo documentado:

1. **Verifica la visualización**:
   - ✅ Todos los endpoints aparecen en la UI
   - ✅ Los tags agrupan los endpoints correctamente
   - ✅ Las descripciones son claras

2. **Prueba cada endpoint**:
   - 📤 Click en "Try it out"
   - 📝 Ingresa parámetros de prueba
   - ▶️ Click en "Execute"
   - 👀 Observa la respuesta

3. **Verifica los códigos de respuesta**:
   - ✅ 200 para peticiones exitosas
   - ✅ 201 para creación
   - ✅ 404 para recursos no encontrados

4. **Revisa los ejemplos**:
   - ✅ Los ejemplos son claros y útiles
   - ✅ Los tipos de datos son correctos

---

### **Paso 12: Exportar y Compartir** (10 min)

Una vez validada tu documentación:

1. **Exportar el archivo**:
   - Click en **File** → **Save as YAML**
   - Guarda con nombre: `jsonplaceholder-complete.yaml`

2. **Generar documentación HTML**:
   - Click en **Generate Server** → **html**
   - Descarga el archivo ZIP
   - Extrae y abre `index.html` en tu navegador

3. **Compartir**:
   - Puedes enviar el archivo YAML a tus compañeros
   - Ellos pueden importarlo en Swagger Editor

---

## ✅ Checklist de Completitud

Marca cada ítem al completarlo:

### Estructura Base
- [ ] Información de la API (title, description, version)
- [ ] Servidor configurado correctamente
- [ ] Sin errores de sintaxis YAML

### Documentación de Endpoints
- [ ] GET /posts (listar todos)
- [ ] GET /posts/{id} (obtener uno)
- [ ] POST /posts (crear)
- [ ] PUT /posts/{id} (actualizar completo)
- [ ] PATCH /posts/{id} (actualizar parcial)
- [ ] DELETE /posts/{id} (eliminar)
- [ ] GET /comments (con parámetro de consulta)
- [ ] GET /comments/{id}

### Esquemas de Datos
- [ ] Schema Post completo
- [ ] Schema NewPost
- [ ] Schema Comment
- [ ] Schema Error

### Calidad
- [ ] Todas las descripciones son claras
- [ ] Ejemplos incluidos en cada esquema
- [ ] Códigos de respuesta apropiados
- [ ] Tags asignados correctamente
- [ ] requestBody documentados en POST/PUT/PATCH
- [ ] Parámetros con descripciones y ejemplos

### Pruebas
- [ ] Probado al menos 3 endpoints GET
- [ ] Probado al menos 1 endpoint POST
- [ ] Verificadas respuestas de error (404)
- [ ] Exportado archivo YAML

---

## 🎯 Próximos Pasos

Ahora que has completado el taller básico:

1. 📚 Revisa los [ejercicios propuestos](ejercicios/ejercicios-propuestos.md)
2. 🔍 Explora la [documentación completa](swagger/jsonplaceholder-complete.yaml)
3. 💪 Practica documentando otros recursos (users, albums, todos, photos)
4. 🚀 Aplica lo aprendido en tus propios proyectos

---

## 🆘 Troubleshooting

### Error: "Structural error at paths./posts"
**Solución**: Verifica la indentación YAML. Cada nivel debe usar 2 espacios.

### Error: "Not a valid parameter definition"
**Solución**: Asegúrate que todos los parámetros tengan `name`, `in` y `schema`.

### Error: "$ref not found"
**Solución**: Verifica que el componente referenciado exista en `components/schemas`.

### La petición no funciona en "Try it out"
**Solución**: Verifica la URL del servidor y que tengas conexión a internet.

### No aparece el panel de visualización
**Solución**: Refresca la página o cambia de navegador.

---

## 📚 Recursos Adicionales

- 📖 [OpenAPI 3.0 Tutorial](https://swagger.io/docs/specification/about/)
- 🎥 [Video: Swagger in 5 minutes](https://www.youtube.com/watch?v=7MS1Z_1c5CU)
- 💻 [Swagger Petstore Example](https://petstore.swagger.io/)
- 📝 [YAML Syntax Guide](https://yaml.org/spec/)

---

**¡Felicidades!** 🎉 Has completado el taller básico de documentación de APIs con Swagger.

**Siguiente paso**: Completa los [ejercicios propuestos](ejercicios/ejercicios-propuestos.md) →

# Taller Clase 008 - Bruno API Testing

## 📋 Descripción
Colección de peticiones HTTP para probar la API de JSONPlaceholder usando Bruno.

## 🚀 Instalación de Bruno

1. Descarga Bruno desde: https://www.usebruno.com/
2. Instala la aplicación en tu sistema operativo
3. Abre Bruno

## 📂 Cómo usar esta colección

1. Abre Bruno
2. Haz clic en "Open Collection"
3. Selecciona la carpeta `Clase-008`
4. Todas las peticiones estarán disponibles en el panel lateral

## 📋 Lista de Peticiones Disponibles

### Posts (6 peticiones)
- ✅ `get-all-posts.bru` - GET /posts - Obtener todos los posts
- ✅ `get-post-by-id.bru` - GET /posts/1 - Obtener post por ID
- ✅ `create-post.bru` - POST /posts - Crear nuevo post
- ✅ `update-post-put.bru` - PUT /posts/1 - Actualizar post completo
- ✅ `update-post-title.bru` - PATCH /posts/1 - Actualizar título de post
- ✅ `delete-post.bru` - DELETE /posts/1 - Eliminar post

### Comments (3 peticiones)
- ✅ `get-all-comments.bru` - GET /comments - Obtener todos los comentarios
- ✅ `get-comments-by-post.bru` - GET /comments?postId=1 - Obtener comentarios por post
- ✅ `create-comment.bru` - POST /comments - Crear nuevo comentario

### Albums (3 peticiones)
- ✅ `get-all-albums.bru` - GET /albums - Obtener todos los álbumes
- ✅ `get-album-by-id.bru` - GET /albums/1 - Obtener álbum por ID
- ✅ `create-album.bru` - POST /albums - Crear nuevo álbum

### Photos (2 peticiones)
- ✅ `get-all-photos.bru` - GET /photos - Obtener todas las fotos
- ✅ `get-photos-by-album.bru` - GET /photos?albumId=1 - Obtener fotos por álbum

### Todos (3 peticiones)
- ✅ `get-all-todos.bru` - GET /todos - Obtener todas las tareas
- ✅ `get-todo-by-id.bru` - GET /todos/1 - Obtener tarea por ID
- ✅ `create-todo.bru` - POST /todos - Crear nueva tarea

### Users (2 peticiones)
- ✅ `get-all-users.bru` - GET /users - Obtener todos los usuarios
- ✅ `get-user-by-id.bru` - GET /users/1 - Obtener usuario por ID

## 🧪 Cómo probar las peticiones

1. Selecciona una petición del panel lateral
2. Haz clic en el botón "Send" o presiona `Ctrl+Enter`
3. Observa la respuesta en el panel derecho
4. Verifica:
   - ✅ Código de estado HTTP (200, 201, etc.)
   - ✅ Headers de respuesta
   - ✅ Body de respuesta (JSON)
   - ✅ Tiempo de respuesta

## 📚 Métodos HTTP utilizados

- **GET** - Obtener recursos
- **POST** - Crear nuevos recursos
- **PUT** - Actualizar recursos completos
- **PATCH** - Actualizar recursos parcialmente
- **DELETE** - Eliminar recursos

## 🎯 Códigos de respuesta esperados

- **200 OK** - Petición exitosa (GET, PUT, PATCH)
- **201 Created** - Recurso creado exitosamente (POST)
- **200 OK** - Recurso eliminado (DELETE en JSONPlaceholder)

## 🔗 API Base URL

```
https://jsonplaceholder.typicode.com
```

## 📝 Notas importantes

- JSONPlaceholder es una API de prueba, los datos no se modifican realmente
- Las peticiones POST, PUT, PATCH y DELETE simularán éxito pero no modificarán la base de datos
- Todos los endpoints devuelven datos en formato JSON

## ✨ Autor

Taller de Aplicaciones Web - VII Semestre

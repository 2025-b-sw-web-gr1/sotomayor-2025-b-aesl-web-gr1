# 🧭 Parte 1: Introducción Teórica

## 📚 ¿Qué es una API REST?

Una **API REST** (Representational State Transfer) es un conjunto de reglas y convenciones para crear servicios web que permiten la comunicación entre sistemas mediante el protocolo HTTP.

### Características principales:
- ✅ **Stateless**: Cada petición es independiente
- ✅ **Cliente-Servidor**: Separación de responsabilidades
- ✅ **Cacheable**: Las respuestas pueden almacenarse en caché
- ✅ **Interfaz uniforme**: Uso de métodos HTTP estándar

## 🎯 ¿Por qué es importante documentar una API?

### 1. 📚 Facilita el entendimiento
- Permite que otros desarrolladores comprendan cómo consumir la API sin necesidad de revisar el código fuente
- Reduce la curva de aprendizaje para nuevos integrantes del equipo
- Proporciona ejemplos claros de uso

### 2. 🤝 Mejora la colaboración
- Equipos de **frontend**, **backend** y **QA** pueden trabajar en paralelo
- Define un "contrato" entre servicios
- Facilita la integración entre diferentes equipos y departamentos

### 3. 🛠️ Reduce errores
- Una documentación clara evita malentendidos en:
  - Parámetros requeridos vs opcionales
  - Tipos de datos esperados
  - Formatos de respuesta
  - Códigos de estado HTTP

### 4. 🔍 Permite testing y validación
- Herramientas como Swagger UI permiten probar endpoints directamente desde la documentación
- Validación automática de peticiones y respuestas
- Generación de casos de prueba

### 5. 🚀 Acelera el desarrollo
- Los desarrolladores frontend pueden empezar a trabajar sin esperar al backend completo
- Permite crear mocks y prototipos rápidamente
- Facilita la detección temprana de problemas de diseño

## 🔧 ¿Qué es Swagger?

**Swagger** es un conjunto de herramientas open-source que permite:
- Diseñar APIs REST
- Documentar APIs de forma interactiva
- Generar código cliente y servidor
- Probar endpoints en tiempo real

### Historia de Swagger
- Creado en 2011 por Tony Tam
- En 2015, la especificación Swagger se convirtió en **OpenAPI Specification (OAS)**
- Actualmente mantenido por la **OpenAPI Initiative** bajo Linux Foundation

## 📐 OpenAPI Specification (OAS)

OpenAPI es un estándar para describir APIs REST de forma independiente del lenguaje de programación.

### Versiones principales:
- **OpenAPI 2.0** (anteriormente Swagger 2.0)
- **OpenAPI 3.0** (versión actual, mayor flexibilidad)
- **OpenAPI 3.1** (compatible con JSON Schema)

## 🧰 Componentes del ecosistema Swagger

### 1. **Swagger Editor**
- Editor online/offline para escribir especificaciones OpenAPI
- Validación en tiempo real
- Vista previa instantánea
- 🔗 [https://editor.swagger.io/](https://editor.swagger.io/)

### 2. **Swagger UI**
- Genera documentación interactiva HTML/CSS/JavaScript
- Permite probar endpoints directamente desde el navegador
- Totalmente personalizable

### 3. **Swagger Codegen**
- Genera código cliente en más de 40 lenguajes
- Genera servidores stub en múltiples frameworks
- Acelera el desarrollo inicial

### 4. **Swagger Hub**
- Plataforma colaborativa para diseño de APIs
- Control de versiones
- Gestión de equipos

## 🌐 Compatibilidad con lenguajes y frameworks

Swagger es compatible con múltiples tecnologías:

| Lenguaje | Frameworks/Librerías |
|----------|---------------------|
| **Node.js** | Express, NestJS, Fastify |
| **Java** | Spring Boot, Jakarta EE |
| **Python** | Flask, Django, FastAPI |
| **C#/.NET** | ASP.NET Core |
| **Go** | Gin, Echo |
| **PHP** | Laravel, Symfony |
| **Ruby** | Ruby on Rails, Sinatra |

## 🎓 Conceptos clave que aprenderás

1. **Paths**: Definición de rutas y endpoints
2. **Operations**: Métodos HTTP (GET, POST, PUT, DELETE, etc.)
3. **Parameters**: Parámetros de consulta, ruta, header y body
4. **Responses**: Códigos de estado y estructuras de respuesta
5. **Schemas**: Definición de modelos de datos
6. **Components**: Reutilización de definiciones
7. **Security**: Documentación de autenticación y autorización

## 📊 Métodos HTTP comunes

| Método | Propósito | Idempotente |
|--------|-----------|-------------|
| **GET** | Obtener recursos | ✅ Sí |
| **POST** | Crear nuevos recursos | ❌ No |
| **PUT** | Actualizar/reemplazar recursos completos | ✅ Sí |
| **PATCH** | Actualizar parcialmente recursos | ❌ No |
| **DELETE** | Eliminar recursos | ✅ Sí |

## 🔢 Códigos de estado HTTP importantes

### 2xx - Éxito
- `200 OK`: Petición exitosa
- `201 Created`: Recurso creado exitosamente
- `204 No Content`: Éxito sin contenido en respuesta

### 4xx - Errores del cliente
- `400 Bad Request`: Petición malformada
- `401 Unauthorized`: Autenticación requerida
- `403 Forbidden`: Sin permisos
- `404 Not Found`: Recurso no encontrado
- `422 Unprocessable Entity`: Datos inválidos

### 5xx - Errores del servidor
- `500 Internal Server Error`: Error genérico del servidor
- `503 Service Unavailable`: Servicio no disponible temporalmente

## 🎯 JSONPlaceholder

Para este taller usaremos **JSONPlaceholder**, una API REST falsa gratuita para testing y prototyping.

### Características:
- ✅ No requiere autenticación
- ✅ Simula operaciones CRUD
- ✅ Datos consistentes y predecibles
- ✅ Ideal para aprendizaje y pruebas

### Recursos disponibles:
- `/posts` - 100 publicaciones
- `/comments` - 500 comentarios
- `/albums` - 100 álbumes
- `/photos` - 5000 fotos
- `/todos` - 200 tareas
- `/users` - 10 usuarios

🔗 **URL base**: `https://jsonplaceholder.typicode.com`

## 📖 Referencias y recursos adicionales

- 📚 [OpenAPI Specification Official](https://spec.openapis.org/oas/latest.html)
- 📚 [Swagger Documentation](https://swagger.io/docs/)
- 📚 [KeepCoding - API Documentation Guide](https://keepcoding.io/)
- 📚 [FreeCodeCamp - APIs for Beginners](https://www.freecodecamp.org/)
- 📚 [REST API Tutorial](https://restfulapi.net/)

---

**Siguiente paso**: Lee los [objetivos del taller](02-objetivos.md) →

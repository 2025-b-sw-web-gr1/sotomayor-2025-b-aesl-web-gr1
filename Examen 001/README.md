# 🎓 Taller: Documentación de APIs REST con Swagger

## 📋 Descripción
Taller práctico para estudiantes de Ingeniería de Sistemas sobre documentación de APIs REST utilizando Swagger y la especificación OpenAPI 3.0.

## 📂 Estructura del Taller

```
📁 Examen 001/
├── README.md (este archivo)
├── 01-teoria.md (conceptos fundamentales)
├── 02-objetivos.md (objetivos de aprendizaje)
├── 03-guia-practica.md (paso a paso del taller)
├── swagger/
│   ├── jsonplaceholder-basic.yaml (ejemplo básico)
│   ├── jsonplaceholder-complete.yaml (documentación completa)
│   └── swagger-config.yaml (configuración avanzada)
└── ejercicios/
    └── ejercicios-propuestos.md
```

## � Instalación del Repositorio

### Opción 1: Clonar el Repositorio

Si quieres tener una copia local del taller:

```bash
# Clonar el repositorio
git clone https://github.com/2025-b-sw-web-gr1/sotomayor-2025-b-aesl-web-gr1.git

# Navegar a la carpeta del examen
cd "sotomayor-2025-b-aesl-web-gr1/Examen 001"

# Abrir en VS Code (opcional)
code .
```

### Opción 2: Descargar ZIP

1. Ve al repositorio en GitHub
2. Click en el botón verde "Code"
3. Selecciona "Download ZIP"
4. Extrae el archivo y navega a la carpeta `Examen 001`

### Opción 3: Solo Ver Online

- Puedes leer todo el material directamente en GitHub sin descargar nada
- Los archivos `.md` se renderizan automáticamente

---

## �🚀 Cómo Ejecutar el Proyecto

### ⭐ Método Recomendado: Swagger Editor Online (Sin Instalación)

Este es el método más rápido y no requiere instalar nada:

1. Abre tu navegador y ve a **[Swagger Editor](https://editor.swagger.io/)**
2. Borra el contenido por defecto del editor
3. Abre uno de los archivos YAML de la carpeta [`swagger/`](swagger/):
   - `jsonplaceholder-basic.yaml` → Para empezar
   - `jsonplaceholder-complete.yaml` → Versión completa
   - `swagger-config.yaml` → Configuración avanzada
4. Copia y pega el contenido en Swagger Editor
5. ¡Listo! Verás la documentación interactiva en el panel derecho
6. Prueba los endpoints con "Try it out" → "Execute"

### 💻 Método Alternativo: Servidor Local con Node.js

Si prefieres ejecutar un servidor local:

#### Prerrequisitos:
- [Node.js](https://nodejs.org/) instalado (v14 o superior)

#### Pasos:

```bash
# 1. Crear carpeta para el servidor
mkdir swagger-server
cd swagger-server

# 2. Inicializar proyecto Node.js
npm init -y

# 3. Instalar dependencias
npm install express swagger-ui-express js-yaml

# 4. Crear archivo server.js
```

Ejecuta el archivo de `server.js`

```bash
# 5. Ejecutar el servidor
node server.js

# 6. Abrir en el navegador
# Navega a: http://localhost:3000/api-docs
```

### 🐳 Método con Docker (Avanzado)

Si tienes Docker instalado:

```bash
# Navegar a la carpeta del proyecto
cd "Examen 001"

# Ejecutar Swagger UI con Docker
docker run -p 8080:8080 -e SWAGGER_JSON=/swagger/jsonplaceholder-complete.yaml -v $(pwd)/swagger:/swagger swaggerapi/swagger-ui

# Abrir en navegador: http://localhost:8080
```

---

## 🎯 Inicio Rápido del Taller

Una vez que tengas acceso al material:

1. 📖 Lee la introducción teórica en [`01-teoria.md`](01-teoria.md)
2. 🎯 Revisa los objetivos en [`02-objetivos.md`](02-objetivos.md)
3. 🛠️ Sigue el paso a paso en [`03-guia-practica.md`](03-guia-practica.md)
4. 💻 Practica con los archivos YAML en la carpeta [`swagger/`](swagger/)
5. 💪 Completa los [ejercicios propuestos](ejercicios/ejercicios-propuestos.md)
6. 📚 Consulta recursos adicionales en [`RECURSOS.md`](RECURSOS.md)

## 🔗 Enlaces Útiles

- 🌐 [Swagger Editor Online](https://editor.swagger.io/) - Editor interactivo (NO requiere instalación)
- 🎯 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - API de prueba
- 📖 [OpenAPI Specification](https://swagger.io/specification/) - Especificación oficial
- 📚 [Swagger Documentation](https://swagger.io/docs/) - Documentación completa
- 🎓 [Recursos Adicionales](RECURSOS.md) - Tutoriales, herramientas y más

---

## 📋 Estructura del Taller

```
📁 Examen 001/
├── 📄 README.md                    (este archivo - guía principal)
├── 📖 01-teoria.md                 (conceptos fundamentales)
├── 🎯 02-objetivos.md              (objetivos de aprendizaje)
├── 🛠️ 03-guia-practica.md          (paso a paso del taller)
├── 📚 RECURSOS.md                  (recursos adicionales)
├── 📁 swagger/
│   ├── jsonplaceholder-basic.yaml       (ejemplo básico para empezar)
│   ├── jsonplaceholder-complete.yaml    (documentación completa)
│   └── swagger-config.yaml              (configuración avanzada)
└── 📁 ejercicios/
    └── ejercicios-propuestos.md         (10 ejercicios prácticos)
```

---

## ✅ Requisitos

### Mínimos (para comenzar):
- ✅ Navegador web moderno (Chrome, Firefox, Edge)
- ✅ Conexión a internet
- ✅ Acceso a [Swagger Editor Online](https://editor.swagger.io/)

### Opcionales (para desarrollo local):
- 💻 [Node.js](https://nodejs.org/) v14+ (para servidor local)
- 🐳 [Docker](https://www.docker.com/) (para ejecución en contenedor)
- 📝 [VS Code](https://code.visualstudio.com/) (editor recomendado)
- 🔌 Extensión de VS Code: "OpenAPI (Swagger) Editor"

### Conocimientos Previos:
- 📌 Conceptos básicos de HTTP (métodos, códigos de estado)
- 📌 Fundamentos de APIs REST
- 📌 Lectura de JSON
- 💡 YAML básico (deseable, no obligatorio)

---

## 🎓 ¿Qué Aprenderás?

Al completar este taller serás capaz de:

- ✅ Documentar APIs REST usando OpenAPI 3.0
- ✅ Crear especificaciones interactivas con Swagger
- ✅ Definir esquemas de datos reutilizables
- ✅ Documentar endpoints con diferentes métodos HTTP
- ✅ Probar APIs directamente desde la documentación
- ✅ Aplicar mejores prácticas de documentación de APIs

**Tiempo estimado:** 2.5 - 3 horas

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. 📖 Consulta la [guía práctica](03-guia-practica.md) - incluye troubleshooting
2. 📚 Revisa [RECURSOS.md](RECURSOS.md) - tutoriales y documentación oficial
3. 💬 Pregunta a tu instructor o compañeros
4. 🔍 Busca en [Stack Overflow - OpenAPI Tag](https://stackoverflow.com/questions/tagged/openapi)

---

## 🔗 Enlaces Útiles

- 🌐 [Swagger Editor Online](https://editor.swagger.io/) - Editor interactivo (NO requiere instalación)
- 🎯 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - API de prueba
- 📖 [OpenAPI Specification](https://swagger.io/specification/) - Especificación oficial
- 📚 [Swagger Documentation](https://swagger.io/docs/) - Documentación completa
- 🎓 [Recursos Adicionales](RECURSOS.md) - Tutoriales, herramientas y más

## 👨‍🏫 Información del Curso

- **Materia:** Aplicaciones Web
- **Período:** I Bimestre
- **Grupo:** GR1
- **Año:** 2025

---
**Última actualización:** 11 de noviembre de 2025

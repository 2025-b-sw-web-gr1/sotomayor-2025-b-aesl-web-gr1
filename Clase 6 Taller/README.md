# 🚀 Portafolio Personal con Handlebars

## 📋 Descripción del Proyecto

Este proyecto es un **portafolio personal** desarrollado como parte del Taller de Aplicaciones Web, utilizando **Handlebars** como motor de renderizado en lugar de EJS. El objetivo es explorar diferentes tecnologías de templating y comparar sus características.

## 🎯 Objetivos del Taller

- ✅ Explorar un motor de renderizado diferente a EJS
- ✅ Implementar un portafolio personal funcional
- ✅ Comparar Handlebars con EJS
- ✅ Documentar ventajas y desventajas observadas

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Handlebars** - Motor de plantillas
- **express-handlebars** - Integración con Express

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos personalizados
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Iconos
- **JavaScript Vanilla** - Interactividad

### Herramientas de Desarrollo
- **npm** - Gestor de paquetes
- **nodemon** - Desarrollo automático

## 🎨 ¿Por qué elegí Handlebars?

### Razones de la elección:

1. **Sintaxis limpia y legible**: Handlebars ofrece una sintaxis muy clara que separa bien la lógica de la presentación.

2. **Amplia adopción**: Es uno de los motores de plantillas más populares en el ecosistema JavaScript.

3. **Compatibilidad**: Funciona tanto en el cliente como en el servidor.

4. **Filosofía "logic-less"**: Promueve plantillas simples sin lógica compleja embebida.

5. **Documentación excelente**: Tiene una documentación muy completa y ejemplos claros.

## 🔄 Comparación: Handlebars vs EJS

### Handlebars

#### ✅ Ventajas:
- **Sintaxis más limpia**: `{{variable}}` es más legible que `<%= variable %>`
- **Separación de responsabilidades**: Fuerza a mantener la lógica fuera de las vistas
- **Helpers personalizados**: Sistema robusto para crear funciones auxiliares
- **Partials reutilizables**: Fácil reutilización de componentes
- **Precompilación**: Mejor rendimiento en producción
- **Seguridad**: Escapado automático de HTML por defecto

#### ❌ Desventajas:
- **Menos flexible**: No permite JavaScript arbitrario en las plantillas
- **Curva de aprendizaje**: Requiere aprender helpers para lógica compleja
- **Configuración inicial**: Más setup inicial comparado con EJS
- **Debugging más difícil**: Menos información de errores en runtime

### EJS

#### ✅ Ventajas:
- **JavaScript directo**: Permite usar JavaScript normal en las plantillas
- **Fácil de aprender**: Sintaxis familiar para desarrolladores JS
- **Flexible**: Muy permisivo con la lógica en vistas
- **Debugging sencillo**: Errores más claros

#### ❌ Desventajas:
- **Sintaxis menos limpia**: `<% %>` puede ser confuso
- **Mezcla de responsabilidades**: Es fácil poner demasiada lógica en las vistas
- **Seguridad**: Requiere más atención al escapado de HTML
- **Rendimiento**: Sin precompilación por defecto

## 🏗️ Estructura del Proyecto

```
portafolio-handlebars/
├── 📁 public/
│   └── 📁 css/
│       └── 📄 style.css          # Estilos personalizados
├── 📁 views/
│   ├── 📁 layouts/
│   │   └── 📄 main.handlebars    # Layout principal
│   ├── 📄 home.handlebars        # Página de inicio
│   ├── 📄 about.handlebars       # Acerca de
│   ├── 📄 projects.handlebars    # Lista de proyectos
│   ├── 📄 project-detail.handlebars # Detalle de proyecto
│   ├── 📄 contact.handlebars     # Contacto
│   └── 📄 404.handlebars         # Página de error
├── 📄 app.js                     # Servidor Express principal
├── 📄 package.json               # Dependencias y scripts
└── 📄 README.md                  # Documentación
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Pasos de instalación:

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes git
   git clone [url-del-repositorio]
   cd portafolio-handlebars
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Ejecutar en modo producción**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📱 Características del Portafolio

### Páginas implementadas:
- **🏠 Inicio**: Presentación personal con hero section y skills
- **👤 Acerca de**: Información personal y formación académica  
- **💼 Proyectos**: Galería de proyectos con filtros
- **📋 Detalle de Proyecto**: Vista detallada de cada proyecto
- **📧 Contacto**: Formulario de contacto funcional
- **❌ Error 404**: Página de error personalizada

### Funcionalidades:
- ✅ Diseño responsive (Bootstrap 5)
- ✅ Navegación activa automática
- ✅ Animaciones CSS personalizadas
- ✅ Formulario de contacto interactivo
- ✅ Sistema de filtros en proyectos
- ✅ SEO-friendly con meta tags

## 🎨 Características de Handlebars Implementadas

### 1. **Layouts**
```handlebars
<!-- En main.handlebars -->
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title>
</head>
<body>
    {{{body}}}
</body>
</html>
```

### 2. **Variables y Expresiones**
```handlebars
<h1>{{name}}</h1>
<p>{{bio}}</p>
```

### 3. **Helpers Condicionales**
```handlebars
{{#if contact.github}}
    <a href="{{contact.github}}">GitHub</a>
{{/if}}
```

### 4. **Iteradores**
```handlebars
{{#each skills}}
    <span class="skill-badge">{{this}}</span>
{{/each}}
```

### 5. **Comparaciones**
```handlebars
{{#if (eq project.id 1)}}
    <p>Primer proyecto especial</p>
{{/if}}
```

### 6. **Datos Anidados**
```handlebars
<a href="mailto:{{contact.email}}">{{contact.email}}</a>
```

## 📊 Conclusiones del Taller

### Lo que aprendí sobre Handlebars:

1. **Sintaxis más limpia**: La sintaxis `{{}}` es más legible que EJS
2. **Mejor organización**: Los layouts y partials están mejor estructurados
3. **Seguridad por defecto**: El escapado automático previene XSS
4. **Helpers útiles**: Los helpers incorporados cubren la mayoría de casos de uso

### Ventajas observadas:
- ✅ Código más mantenible y legible
- ✅ Mejor separación entre lógica y presentación
- ✅ Sistema de layouts más robusto
- ✅ Mejor rendimiento con precompilación

### Desventajas encontradas:
- ❌ Menos flexibilidad para lógica compleja
- ❌ Curva de aprendizaje para helpers avanzados
- ❌ Configuración inicial más compleja
- ❌ Debugging más desafiante

## 🔧 Configuración de Handlebars

```javascript
// Configuración en app.js
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.handlebars'
}));
```

## 🎯 Recomendaciones

### Cuándo usar Handlebars:
- ✅ Proyectos que requieren plantillas limpias y mantenibles
- ✅ Equipos que prefieren separación estricta de responsabilidades
- ✅ Aplicaciones que necesitan precompilación para mejor rendimiento
- ✅ Proyectos donde la seguridad es prioritaria

### Cuándo usar EJS:
- ✅ Prototipado rápido
- ✅ Proyectos pequeños con lógica simple
- ✅ Equipos familiarizados con JavaScript puro
- ✅ Cuando se necesita máxima flexibilidad

## 📚 Recursos y Referencias

- [Documentación oficial de Handlebars](https://handlebarsjs.com/)
- [Express Handlebars en npm](https://www.npmjs.com/package/express-handlebars)
- [Guía de Express.js](https://expressjs.com/es/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)

## 👨‍💻 Autor

**Alex Sotomayor**
- 📧 Email: alex.sotomayor@email.com
- 🎓 Universidad Técnica del Norte
- 📚 VII Semestre - Ingeniería en Software
- 📅 Fecha: Noviembre 2025

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo LICENSE para más detalles.

---

*Proyecto desarrollado como parte del Taller de Aplicaciones Web - Exploración de motores de renderizado alternativos a EJS*
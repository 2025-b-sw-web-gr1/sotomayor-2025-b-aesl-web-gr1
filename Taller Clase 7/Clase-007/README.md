# 🎨 Portafolio Personal con Pug

## 📋 Descripción del Proyecto

Este es un proyecto de portafolio personal desarrollado como parte del taller de Aplicaciones Web, utilizando **Pug** (anteriormente conocido como Jade) como motor de renderizado del lado del servidor, en lugar de EJS.

El portafolio incluye:
- 🏠 Página de inicio con presentación personal
- 👤 Página "Sobre Mí" con habilidades y educación
- 💼 Página de proyectos con filtros interactivos
- 📧 Página de contacto con formulario
- ❌ Página 404 personalizada

---

## 🎯 ¿Por qué elegí Pug?

Elegí **Pug** por las siguientes razones:

### 1. **Sintaxis Limpia y Concisa**
Pug utiliza indentación en lugar de etiquetas de cierre, lo que hace el código más legible y fácil de mantener.

```pug
// Pug
div.container
  h1 Hola Mundo
  p Este es un párrafo
```

vs

```html
<!-- HTML tradicional -->
<div class="container">
  <h1>Hola Mundo</h1>
  <p>Este es un párrafo</p>
</div>
```

### 2. **Productividad**
- Menos código que escribir
- Menos posibilidad de errores de sintaxis (etiquetas sin cerrar)
- Autocompletado más eficiente

### 3. **Ampliamente Utilizado**
- Es uno de los motores de plantillas más populares en el ecosistema Node.js
- Gran comunidad y documentación
- Usado por empresas importantes

### 4. **Permanencia en Node.js**
- Me permite seguir trabajando con Node.js y Express
- No requiere aprender un nuevo lenguaje de programación
- Fácil integración con el ecosistema actual

---

## 🔄 Diferencias con EJS

| Característica | EJS | Pug |
|---------------|-----|-----|
| **Sintaxis** | Basada en HTML con etiquetas `<% %>` | Basada en indentación, sin etiquetas de cierre |
| **Curva de aprendizaje** | Baja (similar a HTML) | Media (requiere aprender nueva sintaxis) |
| **Verbosidad** | Más verboso | Más conciso |
| **Legibilidad** | Depende de las preferencias | Muy limpia con correcta indentación |
| **Lógica** | `<% if (condition) { %>` | `if condition` |
| **Interpolación** | `<%= variable %>` | `#{variable}` o `= variable` |
| **Iteraciones** | `<% array.forEach() { %>` | `each item in array` |
| **Herencia** | Mediante `include` | `extends` y `block` (más robusto) |
| **Mixins** | No nativos | Sí, muy potentes |
| **Atributos** | `class="clase"` | `.clase` o `(class="clase")` |

### Ejemplo Comparativo

**EJS:**
```ejs
<% if (user) { %>
  <div class="user-info">
    <h2><%= user.name %></h2>
    <p><%= user.email %></p>
  </div>
<% } %>
```

**Pug:**
```pug
if user
  .user-info
    h2= user.name
    p= user.email
```

---

## ✅ Ventajas de Pug

### 1. **Código Más Limpio**
- Menos caracteres a escribir
- Estructura visual clara mediante indentación
- No hay etiquetas de cierre que olvidar

### 2. **Sistema de Herencia Robusto**
```pug
//- layout.pug
block content

//- index.pug
extends layout
block content
  h1 Contenido específico
```

### 3. **Mixins Reutilizables**
```pug
mixin button(text, type)
  button(class=`btn btn-${type}`)= text

+button('Enviar', 'primary')
+button('Cancelar', 'secondary')
```

### 4. **Atributos Dinámicos Simplificados**
```pug
a(href=url, class=active ? 'active' : '') Enlace
```

### 5. **Menos Propenso a Errores**
- La indentación fuerza una estructura correcta
- No hay etiquetas sin cerrar
- El compilador detecta errores de sintaxis fácilmente

### 6. **Filtros Integrados**
```pug
script.
  const x = 5;
  console.log(x);
```

### 7. **Interpolación Natural**
```pug
p Hola #{nombre}, tienes #{edad} años
```

---

## ❌ Desventajas de Pug

### 1. **Curva de Aprendizaje**
- Requiere tiempo para acostumbrarse a la sintaxis
- Los desarrolladores nuevos pueden encontrarlo confuso
- La indentación estricta puede ser frustrante al inicio

### 2. **Menos Intuitivo para Diseñadores Web**
- Los diseñadores que conocen HTML pueden tener dificultades
- No se puede copiar/pegar HTML directamente
- Requiere conversión de HTML a Pug

### 3. **Debugging Más Complejo**
- Los errores de indentación pueden ser difíciles de detectar
- Los mensajes de error a veces no son claros
- El HTML compilado puede ser difícil de leer

### 4. **Sensibilidad a Espacios**
- Mezclar tabs y espacios causa errores
- Un espacio extra puede romper el código
- Requiere configuración consistente del editor

### 5. **Menor Adopción que EJS**
- EJS es más popular y más fácil de encontrar desarrolladores
- Menos ejemplos en Stack Overflow comparado con EJS
- Algunas empresas prefieren EJS por su similitud con HTML

### 6. **Herramientas de Desarrollo**
- Menos extensiones de IDE comparado con HTML/EJS
- El autocompletado puede ser menos preciso
- Algunas herramientas de testing no lo soportan nativamente

### 7. **Rendimiento Inicial**
- Requiere compilación a HTML
- Pequeño overhead comparado con templates HTML puros
- (Aunque es mínimo en la mayoría de casos)

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express**: Framework web para Node.js
- **Pug**: Motor de plantillas/renderizado
- **CSS3**: Estilos personalizados
- **JavaScript**: Interactividad del lado del cliente

---

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
cd "Clase-007"
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor**
```bash
npm start
```

O para desarrollo con auto-recarga:
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

---

## 📁 Estructura del Proyecto

```
Clase-007/
│
├── views/                  # Plantillas Pug
│   ├── layout.pug         # Plantilla base
│   ├── index.pug          # Página de inicio
│   ├── about.pug          # Página sobre mí
│   ├── projects.pug       # Página de proyectos
│   ├── contact.pug        # Página de contacto
│   └── 404.pug            # Página de error
│
├── public/                 # Archivos estáticos
│   └── css/
│       └── styles.css     # Estilos principales
│
├── server.js              # Servidor Express
├── package.json           # Dependencias del proyecto
└── README.md              # Este archivo
```

---

## 🎨 Características del Portafolio

### 1. **Diseño Responsivo**
- Se adapta a dispositivos móviles, tablets y escritorio
- Menú hamburguesa en móviles
- Grid fluido y flexible

### 2. **Navegación Interactiva**
- Indicador de página activa
- Smooth scrolling
- Menú sticky

### 3. **Secciones Dinámicas**
- Datos inyectados desde el servidor
- Barras de progreso animadas para habilidades
- Filtros de proyectos con JavaScript

### 4. **Formulario de Contacto**
- Validación del lado del cliente
- Diseño limpio y profesional

### 5. **Página 404 Personalizada**
- Mensaje amigable
- Navegación de retorno

---

## 🎓 Conceptos de Pug Demostrados

### 1. **Extends y Blocks**
```pug
extends layout
block content
  // Contenido específico de la página
```

### 2. **Interpolación**
```pug
h1 #{title} | Mi Portafolio
p= descripcion
```

### 3. **Condicionales**
```pug
if title === 'Inicio'
  p Bienvenido
else
  p Explora el sitio
```

### 4. **Iteraciones**
```pug
each proyecto in proyectos
  .project-card
    h3= proyecto.nombre
    p= proyecto.descripcion
```

### 5. **Atributos Dinámicos**
```pug
a(href=url, class=active ? 'active' : '')
```

### 6. **Comentarios**
```pug
//- Este comentario no aparece en el HTML
// Este comentario sí aparece
```

### 7. **JavaScript Embebido**
```pug
script.
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada');
  });
```

---

## 🔗 Rutas del Proyecto

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/sobre-mi` | Información personal y habilidades |
| `/proyectos` | Portfolio de proyectos |
| `/contacto` | Formulario de contacto |
| `/*` | Página 404 para rutas no encontradas |

---

## 🚀 Posibles Mejoras

1. **Backend**
   - Conectar formulario de contacto a una base de datos
   - Implementar sistema de autenticación
   - API RESTful para proyectos

2. **Frontend**
   - Animaciones más avanzadas con bibliotecas como GSAP
   - Modo oscuro/claro
   - Internacionalización (i18n)

3. **SEO**
   - Meta tags dinámicos
   - Sitemap XML
   - Schema.org markup

4. **Rendimiento**
   - Lazy loading de imágenes
   - Minificación de CSS/JS
   - CDN para assets

---

## 👨‍💻 Autor

**Alexis Sotomayor**
- Estudiante de Ingeniería en Sistemas
- Universidad Técnica del Norte
- VII Semestre - Aplicaciones Web

---

## 📝 Conclusión

### ¿Cuándo usar Pug?

✅ **Usa Pug si:**
- Prefieres sintaxis concisa y limpia
- Valoras la reutilización de código (mixins, extends)
- Tu equipo está familiarizado con Node.js
- Quieres forzar buenas prácticas de indentación
- Disfrutas de una curva de aprendizaje desafiante

❌ **Usa EJS si:**
- Necesitas onboarding rápido de nuevos desarrolladores
- Trabajas con diseñadores que conocen HTML
- Prefieres sintaxis familiar (HTML)
- Necesitas copiar/pegar HTML existente
- Valoras la simplicidad sobre la elegancia

### Mi Experiencia

Trabajar con Pug fue un reto interesante. Al inicio, la sintaxis basada en indentación se sentía extraña, pero después de crear algunas páginas, aprecié su limpieza y concisión. La herencia de plantillas con `extends` y `blocks` es más elegante que en EJS, y los mixins son increíblemente útiles.

Sin embargo, reconozco que para equipos con personas que solo conocen HTML, EJS puede ser más práctico. Pug brilla cuando trabajas en proyectos donde todos los desarrolladores están dispuestos a invertir tiempo en dominar la herramienta.

En resumen: **Pug es una excelente herramienta que vale la pena aprender**, aunque EJS puede ser más pragmático en ciertos contextos.

---

## 📚 Recursos Adicionales

- [Documentación Oficial de Pug](https://pugjs.org/)
- [Express + Pug Tutorial](https://expressjs.com/en/guide/using-template-engines.html)
- [HTML to Pug Converter](https://html-to-pug.com/)
- [Pug Cheatsheet](https://devhints.io/pug)

---

## 📄 Licencia

MIT License - Libre para uso educativo y personal.

---

**Fecha de Creación:** Noviembre 2025  
**Taller:** Clase 7 y 8 - Aplicaciones Web  
**Motor de Renderizado:** Pug 3.0.2

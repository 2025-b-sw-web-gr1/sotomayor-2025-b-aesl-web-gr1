# 📝 Prompts Utilizados para la Creación del Proyecto

Este documento contiene los prompts que utilicé para trabajar con IA durante el desarrollo del proyecto.

---

## 🎯 Prompt Inicial - Configuración del Proyecto

```
Necesito crear un portafolio personal usando Node.js y Express con Pug como motor 
de renderizado. El proyecto debe incluir:
- Configuración básica de Express con Pug
- Estructura de carpetas (views, public)
- Archivo package.json con las dependencias necesarias
- Servidor básico con rutas para inicio, sobre mí, proyectos y contacto
```

---

## 🎨 Prompt para las Vistas en Pug

```
Crea las siguientes vistas en Pug para mi portafolio:

1. layout.pug - Template base con:
   - Navegación responsive con menú hamburguesa
   - Footer con información
   - Sistema de bloques para contenido dinámico

2. index.pug - Página de inicio con:
   - Sección hero con presentación
   - Grid de características (4 cards)
   - Sección de estadísticas

3. about.pug - Página sobre mí con:
   - Grid con texto informativo e imagen
   - Sección de habilidades con barras de progreso animadas
   - Timeline de educación

4. projects.pug - Página de proyectos con:
   - Botones de filtro (Todos, Completados, En Desarrollo)
   - Grid de tarjetas de proyectos
   - CTA al final

5. contact.pug - Página de contacto con:
   - Formulario de contacto funcional
   - Información de contacto con iconos
   - Links a redes sociales

6. 404.pug - Página de error personalizada

Usa interpolación de Pug, condicionales, iteraciones y extends/blocks.
```

---

## 💅 Prompt para los Estilos CSS

```
Crea un archivo CSS completo y profesional para el portafolio con:

1. Variables CSS para colores y espaciado
2. Reset CSS básico
3. Diseño responsivo con breakpoints para móvil y tablet
4. Estilos para:
   - Navegación sticky con menú hamburguesa en móvil
   - Hero section con gradientes
   - Cards con hover effects y sombras
   - Formularios con estados focus
   - Footer oscuro
   - Animaciones suaves (transiciones, floating, heartbeat)
   - Barras de progreso animadas

Usa:
- Grid y Flexbox para layouts
- Gradientes modernos (azul #6366f1 y rosa #ec4899)
- Sombras y bordes redondeados
- Fuente Google Fonts: Poppins
- Mobile-first approach
```

---

## 📖 Prompt para la Documentación

```
Crea un README.md completo que incluya:

1. Descripción del proyecto
2. Explicación detallada de por qué elegí Pug
3. Tabla comparativa entre Pug y EJS con ejemplos de código
4. Lista de ventajas de Pug (mínimo 7)
5. Lista de desventajas de Pug (mínimo 7, sé crítico y realista)
6. Instrucciones de instalación y uso
7. Estructura del proyecto
8. Características implementadas
9. Conceptos de Pug demostrados con ejemplos
10. Tabla de rutas del proyecto
11. Posibles mejoras
12. Conclusión personal sobre la experiencia
13. Cuándo usar Pug vs EJS (guía práctica)
14. Recursos adicionales

Usa emojis para hacer el documento más visual y organizado.
El tono debe ser educativo pero honesto sobre las limitaciones.
```

---

## 🔧 Prompts para Resolución de Problemas

### Problema: Error de Indentación en Pug
```
Tengo un error en mi archivo Pug: "unexpected token 'indent'". 
El código es:
[pegar código]

¿Puedes identificar el problema de indentación y corregirlo?
```

### Problema: Atributos Dinámicos
```
¿Cómo puedo agregar clases CSS condicionales en Pug? Necesito que un 
enlace tenga la clase "active" si el título de la página coincide.
```

### Problema: Iteración con Datos
```
Tengo un array de objetos "proyectos" en mi ruta de Express. ¿Cómo 
itero sobre ellos en Pug para crear tarjetas de proyectos? Cada 
proyecto tiene: nombre, descripcion, tecnologias (array), imagen, estado.
```

---

## 🎨 Prompts para Mejoras de Diseño

### Mejora de UX
```
¿Cómo puedo mejorar la experiencia de usuario en mi portafolio? 
Actualmente tengo [describir estado actual]. Dame 5 sugerencias 
específicas con código de implementación.
```

### Animaciones
```
Quiero agregar animaciones sutiles a mi portafolio en Pug. 
Necesito:
1. Animación de aparición para las cards
2. Efecto hover para botones
3. Loading de barras de progreso
4. Smooth scroll entre secciones

Dame el código CSS y JavaScript necesario.
```

### Responsive Design
```
Mi navegación no se ve bien en móvil. Necesito un menú hamburguesa 
que funcione con solo CSS (sin JavaScript). El menú debe:
- Mostrar 3 líneas horizontales en móvil
- Convertirse en X cuando está abierto
- Mostrar/ocultar el menú con una animación suave
```

---

## 📝 Prompts de Debugging

### Debug de Pug
```
Mi template de Pug no está renderizando correctamente. El navegador 
muestra [descripción del error]. 

Código del servidor:
[pegar código de Express]

Código de la vista:
[pegar código de Pug]

¿Qué estoy haciendo mal?
```

### Debug de CSS
```
Los estilos no se están aplicando a mi página. Verifiqué:
- La ruta del archivo CSS
- El link en el layout
- Los nombres de las clases

¿Qué más podría estar fallando?
```

---

## 🚀 Prompts para Características Avanzadas

### Filtros Interactivos
```
Necesito implementar filtros para mi sección de proyectos. Los proyectos 
tienen un atributo "estado" que puede ser "Completado" o "En desarrollo". 

Crea botones de filtro que:
1. Muestren todos los proyectos por defecto
2. Permitan filtrar por estado
3. Tengan un indicador visual del filtro activo
4. Animen la transición entre filtros

Usa JavaScript vanilla (sin jQuery).
```

### Formulario con Validación
```
Mi formulario de contacto necesita validación del lado del cliente. 
Debe validar:
- Email con formato correcto
- Campos requeridos no vacíos
- Mensaje con mínimo 10 caracteres

Muestra mensajes de error debajo de cada campo y previene el submit 
si hay errores. Usa JavaScript moderno (ES6+).
```

---

## 💡 Prompts de Aprendizaje

### Comparación de Tecnologías
```
Estoy decidiendo entre Pug, EJS, y Handlebars para mi proyecto. 
¿Puedes hacer una comparación objetiva considerando:
- Sintaxis
- Curva de aprendizaje
- Rendimiento
- Ecosistema y comunidad
- Casos de uso ideales

Dame ejemplos de código equivalente en los tres.
```

### Mejores Prácticas
```
¿Cuáles son las mejores prácticas para organizar templates en Pug? 
Tengo un proyecto con múltiples páginas y componentes reutilizables. 
Dame una estructura de carpetas recomendada con ejemplos.
```

### Mixins en Pug
```
¿Cómo funcionan los mixins en Pug? Dame 5 ejemplos prácticos de mixins 
útiles para un portafolio (botones, cards, formularios, etc.) con su 
implementación completa.
```

---

## 🎓 Reflexión sobre el Uso de IA

### Lo que funcionó bien:
- Pedir comparaciones específicas con tablas
- Solicitar múltiples ejemplos de código
- Ser explícito sobre el nivel de detalle necesario
- Pedir críticas honestas (ventajas Y desventajas)

### Lo que mejoraría:
- Dividir prompts muy largos en varios más pequeños
- Validar el código generado antes de usarlo
- Pedir explicaciones de conceptos antes del código
- Ser más específico sobre el contexto del proyecto

---

## 📚 Recursos que Complementan el Uso de IA

Aunque la IA fue muy útil, también consulté:
- Documentación oficial de Pug
- MDN Web Docs para CSS/JavaScript
- Stack Overflow para problemas específicos
- GitHub para ver ejemplos reales de proyectos con Pug

---

## 🎯 Conclusión sobre el Uso de IA

La IA fue una herramienta invaluable para:
1. ✅ Generar código boilerplate rápidamente
2. ✅ Explorar diferentes enfoques de solución
3. ✅ Aprender sintaxis nueva (Pug)
4. ✅ Obtener comparaciones objetivas
5. ✅ Resolver problemas de debugging

Sin embargo, fue importante:
1. ⚠️ Verificar el código generado
2. ⚠️ Entender lo que hace cada línea
3. ⚠️ Adaptar las sugerencias a mi contexto específico
4. ⚠️ No depender 100% de la IA sin aprender los fundamentos

---

**Nota final:** Este documento es parte de la entrega del taller y demuestra 
el uso responsable de IA como herramienta de aprendizaje y desarrollo, no 
como sustituto del pensamiento crítico y la comprensión de los conceptos.

---

**Fecha:** Noviembre 2025  
**Autor:** Alexis Sotomayor  
**Taller:** Aplicaciones Web - Clase 7 y 8

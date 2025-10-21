# 🎨 Guía Educativa: Formas de Cargar Estilos CSS

Proyecto educativo que explica y demuestra las **4 formas principales** de aplicar estilos CSS en una página web.

## 📚 Contenido

Este proyecto cubre:

### 1️⃣ **Estilos Inline (En Línea)**
- Uso del atributo `style` directamente en elementos HTML
- Mayor prioridad (especificidad)
- Ejemplo: `<p style="color: blue;">Texto</p>`

### 2️⃣ **Estilos Internos (Internal Styles)**
- Uso de la etiqueta `<style>` en el `<head>`
- Estilos centralizados en el mismo archivo HTML
- Ideal para páginas únicas

### 3️⃣ **Estilos Externos (External Stylesheet)** ⭐ RECOMENDADO
- Archivos CSS separados cargados con `<link>`
- Peticiones HTTP al servidor
- Mejor práctica para proyectos profesionales
- Caché del navegador para mejor rendimiento

### 4️⃣ **Importación CSS (@import)**
- Uso de `@import url('archivo.css')`
- Carga secuencial mediante HTTP
- Útil para desarrollo, no recomendado para producción

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js instalado en tu sistema
- Un navegador web moderno

### Paso 1: Instalar dependencias
```bash
npm install
```

Este comando instalará `http-server`, un servidor web simple basado en Node.js.

### Paso 2: Iniciar el servidor
```bash
npm start
```

O para modo desarrollo con caché deshabilitado:
```bash
npm run dev
```

El servidor se iniciará en `http://localhost:8080` y abrirá automáticamente tu navegador.

## 🌐 Sobre HTTP y la Carga de Estilos

### ¿Cómo se cargan los archivos CSS mediante HTTP?

Cuando usas `<link rel="stylesheet" href="external-styles.css">`:

1. **Petición HTTP GET**: El navegador envía una petición al servidor
2. **Respuesta del Servidor**: El servidor devuelve el archivo CSS
3. **Aplicación de Estilos**: El navegador aplica los estilos a la página
4. **Caché**: El archivo se guarda en caché para futuras visitas

### Ventajas del Servidor HTTP

- **Simula un entorno real**: Como funcionan los sitios web en producción
- **Caché del navegador**: Permite probar el almacenamiento en caché
- **Peticiones HTTP**: Puedes ver las peticiones en las herramientas de desarrollo
- **CORS**: Evita problemas de seguridad al cargar archivos locales

## 🛠️ Estructura del Proyecto

```
pagina_web_css_styles/
├── index.html              # Página principal con todos los métodos
├── external-styles.css     # Archivo CSS externo (método 3)
├── imported-styles.css     # Archivo CSS importado (método 4)
├── package.json           # Configuración de Node.js
└── README.md             # Este archivo
```

## 📊 Comparación de Métodos

| Método | Prioridad | Reutilizable | HTTP | Recomendado |
|--------|-----------|--------------|------|-------------|
| Inline | ⭐⭐⭐⭐⭐ | ❌ | ❌ | Solo casos específicos |
| Interno | ⭐⭐⭐ | Solo en la página | ❌ | Páginas únicas |
| Externo | ⭐⭐⭐ | ✅ | ✅ | ⭐ SÍ - Mejor práctica |
| @import | ⭐⭐⭐ | ✅ | ✅ | Solo desarrollo |

## 🎯 Mejores Prácticas

1. **Usa archivos CSS externos** para proyectos profesionales
2. **Evita estilos inline** excepto para casos dinámicos con JavaScript
3. **Evita @import** en producción (usa múltiples `<link>` en su lugar)
4. **Minifica tus CSS** en producción
5. **Aprovecha el caché** del navegador

## 🔧 Comandos Útiles

```bash
# Iniciar servidor en puerto 8080 (predeterminado)
npm start

# Iniciar servidor sin caché (útil para desarrollo)
npm run dev

# Iniciar servidor en puerto personalizado
npx http-server -p 3000

# Ver todas las peticiones HTTP en la consola
npx http-server -p 8080 --log-ip
```

## 📖 Recursos Adicionales

- [MDN - CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [MDN - Vincular estilos](https://developer.mozilla.org/es/docs/Web/HTML/Element/link)
- [HTTP Server en Node.js](https://www.npmjs.com/package/http-server)

## 👨‍💻 Autor

VII Semestre - Aplicaciones Web 2025

## 📝 Licencia

MIT - Libre para uso educativo

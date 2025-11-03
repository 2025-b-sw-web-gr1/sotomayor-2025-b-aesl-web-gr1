# TaskManager SPA - Documentación Técnica

## 📋 Descripción del Proyecto

TaskManager SPA es una aplicación de página única (Single Page Application) desarrollada para la gestión de tareas personales con diferentes niveles de importancia. La aplicación permite crear, editar, eliminar y organizar tareas de manera eficiente, ofreciendo una experiencia de usuario fluida y moderna.

## 🏗️ Arquitectura de la Aplicación

### Patrón Arquitectónico: Model-View-Controller (MVC)

La aplicación implementa el patrón MVC adaptado para el frontend:

- **Model**: Representado por la clase `TaskManager` que maneja el estado y los datos
- **View**: El DOM y los elementos HTML que representan la interfaz de usuario
- **Controller**: Los métodos de la clase `TaskManager` que manejan la lógica de negocio y la interacción usuario-aplicación

### Arquitectura SPA (Single Page Application)

```
┌─────────────────────────────────────────┐
│                 CLIENT                  │
├─────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────────────┐│
│  │   HTML      │ │      JavaScript     ││
│  │ (Structure) │ │   (Business Logic)  ││
│  └─────────────┘ └─────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │              CSS                    ││
│  │           (Styling)                 ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│           Local Storage                 │
│         (Data Persistence)              │
└─────────────────────────────────────────┘
```

## 🧩 Componentes Principales

### 1. TaskManager (Controlador Principal)

```javascript
class TaskManager {
    constructor() {
        this.tasks = [];              // Estado de las tareas
        this.currentFilter = 'all';   // Filtro actual
        this.searchQuery = '';        // Consulta de búsqueda
        this.elements = {};           // Referencias DOM
    }
}
```

**Responsabilidades:**
- Gestión del estado de la aplicación
- Manejo de eventos de usuario
- Persistencia de datos en localStorage
- Renderizado dinámico de la interfaz

### 2. Sistema de Gestión de Tareas

#### Modelo de Datos de Tarea
```javascript
const task = {
    id: 'unique_id',              // Identificador único
    title: 'Título de la tarea',  // Título requerido
    description: 'Descripción',   // Descripción opcional
    priority: 'high|medium|low',  // Nivel de importancia
    dueDate: '2025-01-15',       // Fecha límite opcional
    completed: false,             // Estado de completado
    createdAt: '2025-01-13T...',  // Fecha de creación
    completedAt: null,            // Fecha de completado
    updatedAt: null               // Fecha de última actualización
}
```

### 3. Sistema de Filtrado y Búsqueda

#### Filtros Disponibles:
- **Por Estado**: Todas, Pendientes, Completadas
- **Por Prioridad**: Alta, Media, Baja
- **Por Búsqueda**: Texto libre en título y descripción
- **Por Ordenamiento**: Fecha, Prioridad, Título, Fecha límite

### 4. Sistema de Notificaciones

Implementa un sistema de notificaciones no intrusivas que informa al usuario sobre:
- Acciones exitosas (crear, editar, completar tareas)
- Errores de validación
- Confirmaciones de eliminación
- Estados de la aplicación

### 5. Sistema de Modales

#### Modal de Edición
- Formulario pre-poblado con datos de la tarea
- Validación en tiempo real
- Manejo de estados de carga

#### Modal de Confirmación de Eliminación
- Confirmación explícita antes de eliminar
- Prevención de eliminaciones accidentales

## 🔧 Funcionalidades Principales

### CRUD Completo
- **Create**: Agregar nuevas tareas con validación
- **Read**: Visualizar tareas con diferentes filtros
- **Update**: Editar tareas existentes
- **Delete**: Eliminar tareas con confirmación

### Características Avanzadas
- **Búsqueda en tiempo real**
- **Filtrado múltiple**
- **Ordenamiento dinámico**
- **Persistencia local**
- **Interfaz responsive**
- **Atajos de teclado**
- **Notificaciones contextuales**
- **Validación de formularios**

## 📱 Diseño Responsive

### Breakpoints
- **Desktop**: > 768px - Layout completo con sidebar
- **Tablet**: 481px - 768px - Layout adaptado
- **Mobile**: < 480px - Layout vertical optimizado

### Técnicas Utilizadas
- **CSS Grid**: Para layouts complejos
- **Flexbox**: Para alineación y distribución
- **Media Queries**: Para responsividad
- **Viewport units**: Para dimensiones fluidas

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
    --primary-color: #4f46e5;     /* Índigo principal */
    --secondary-color: #f8fafc;   /* Gris claro */
    --accent-color: #06b6d4;      /* Cian para acentos */
    --danger-color: #ef4444;      /* Rojo para acciones destructivas */
    --warning-color: #f59e0b;     /* Ámbar para advertencias */
    --success-color: #10b981;     /* Verde para confirmaciones */
}
```

### Tipografía
- **Fuente principal**: Inter, system fonts
- **Jerarquía**: h1-h3 con escalas proporcionales
- **Pesos**: 400 (normal), 600 (semibold), 700 (bold)

### Espaciado
- **Sistema de 8px**: Múltiplos de 8 para consistencia
- **Padding/Margin**: 0.5rem, 1rem, 1.5rem, 2rem

## 🔄 Flujo de Datos

### 1. Inicialización
```
Cargar página → Instanciar TaskManager → Cargar datos de localStorage → Renderizar interfaz
```

### 2. Creación de Tarea
```
Usuario completa formulario → Validación → Crear objeto tarea → Agregar al array → Guardar en localStorage → Re-renderizar → Mostrar notificación
```

### 3. Filtrado
```
Usuario selecciona filtro → Actualizar estado del filtro → Filtrar array de tareas → Re-renderizar lista → Actualizar estado visual de filtros
```

### 4. Edición
```
Usuario hace clic en editar → Abrir modal → Pre-llenar formulario → Usuario modifica → Validar → Actualizar tarea → Guardar → Re-renderizar → Cerrar modal
```

## 🚀 Características Técnicas

### Persistencia de Datos
- **localStorage**: Almacenamiento local del navegador
- **JSON**: Serialización de datos
- **Error Handling**: Manejo de errores de almacenamiento

### Optimizaciones de Rendimiento
- **Event Delegation**: Para manejar eventos dinámicos
- **Debouncing**: En búsqueda para evitar renders excesivos
- **Lazy Loading**: Renderizado solo cuando es necesario

### Accesibilidad (a11y)
- **ARIA labels**: Para lectores de pantalla
- **Keyboard navigation**: Navegación completa por teclado
- **Focus management**: Gestión apropiada del foco
- **Color contrast**: Contraste adecuado para legibilidad

### Seguridad
- **XSS Prevention**: Escape de HTML en contenido dinámico
- **Input Validation**: Validación de formularios
- **Safe DOM Manipulation**: Prevención de inyección de código

## 🛠️ Estructura de Archivos

```
TaskManager SPA/
├── index.html              # Documento principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── app.js              # Lógica de la aplicación
├── assets/                 # Recursos estáticos
└── README.md               # Esta documentación
```

## 📋 Guía de Uso

### Instalación
1. Descargar o clonar el proyecto
2. Abrir `index.html` en un navegador moderno
3. ¡Listo para usar!

### Crear una Nueva Tarea
1. Completar el formulario en la parte superior
2. Seleccionar nivel de importancia
3. Opcionalmente agregar fecha límite
4. Hacer clic en "Agregar Tarea"

### Gestionar Tareas
- **Completar**: Hacer clic en el botón de check ✓
- **Editar**: Hacer clic en el botón de editar ✏️
- **Eliminar**: Hacer clic en el botón de eliminar 🗑️

### Filtrar y Buscar
- **Búsqueda**: Escribir en el campo de búsqueda
- **Filtros de estado**: Usar botones "Todas", "Pendientes", "Completadas"
- **Filtros de prioridad**: Hacer clic en los botones de prioridad
- **Ordenar**: Usar el selector de ordenamiento

### Atajos de Teclado
- **Ctrl/Cmd + N**: Enfocar campo de nueva tarea
- **Ctrl/Cmd + F**: Enfocar campo de búsqueda
- **Escape**: Cerrar modales abiertos

## 🧪 Casos de Uso

### Usuario Estudiante
- Crear tareas para asignaciones con fechas de entrega
- Priorizar según importancia de la materia
- Filtrar tareas por estado para ver progreso

### Usuario Profesional
- Gestionar proyectos con diferentes prioridades
- Usar fechas límite para deadlines
- Buscar tareas específicas rápidamente

### Usuario Personal
- Organizar tareas domésticas y personales
- Completar tareas y ver progreso
- Mantener lista de pendientes organizada

## 🔧 Extensibilidad

### Funcionalidades Futuras
- **Categorías/Etiquetas**: Agrupar tareas por categorías
- **Colaboración**: Compartir tareas con otros usuarios
- **Sincronización**: Backup en la nube
- **Recordatorios**: Notificaciones push
- **Estadísticas**: Análisis de productividad
- **Temas**: Personalización visual
- **Export/Import**: Migración de datos

### Puntos de Extensión
```javascript
// Agregar nuevos tipos de filtro
TaskManager.prototype.addCustomFilter = function(name, filterFn) {
    this.customFilters[name] = filterFn;
}

// Agregar nuevos tipos de ordenamiento
TaskManager.prototype.addSortOption = function(name, sortFn) {
    this.sortOptions[name] = sortFn;
}
```

## 🐛 Debugging y Mantenimiento

### Herramientas de Desarrollo
La aplicación incluye utilidades para desarrolladores accesibles desde la consola:

```javascript
// Exportar tareas
taskManagerUtils.exportTasks();

// Limpiar tareas completadas
taskManagerUtils.clearCompleted();

// Obtener estadísticas
taskManagerUtils.getStats();

// Reset completo
taskManagerUtils.reset();
```

### Logging
- Errores se registran en la consola
- Acciones importantes se notifican al usuario
- Estados de la aplicación son observables

## 🌐 Compatibilidad de Navegadores

### Soporte Completo
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Funcionalidades Utilizadas
- ES6+ Classes
- localStorage
- CSS Grid/Flexbox
- Modern JavaScript APIs

## 📈 Métricas y Rendimiento

### Optimizaciones Implementadas
- **Minimización de DOM queries**: Referencias cacheadas
- **Event batching**: Agrupación de actualizaciones
- **Efficient rendering**: Re-render solo cuando es necesario
- **Memory management**: Cleanup de event listeners

### Métricas Clave
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle size**: ~30KB total
- **Memory usage**: Estable sin memory leaks

## 🎯 Conclusiones

TaskManager SPA demuestra una implementación moderna y eficiente de una aplicación de gestión de tareas que:

1. **Sigue mejores prácticas** de desarrollo frontend
2. **Implementa patrones de diseño** reconocidos (MVC)
3. **Ofrece experiencia de usuario** fluida y responsive
4. **Mantiene código** limpio, documentado y extensible
5. **Considera accesibilidad** y usabilidad
6. **Optimiza rendimiento** para dispositivos diversos

La aplicación sirve como base sólida para futuras mejoras y demuestra competencias en desarrollo de SPAs modernas con JavaScript vanilla, CSS avanzado y arquitectura escalable.

---

## 📞 Soporte y Contribución

Para reportar problemas, sugerir mejoras o contribuir al proyecto, por favor consulta la documentación del desarrollador o contacta al equipo de desarrollo.

**Desarrollado con ❤️ para el VII Semestre de Aplicaciones Web**
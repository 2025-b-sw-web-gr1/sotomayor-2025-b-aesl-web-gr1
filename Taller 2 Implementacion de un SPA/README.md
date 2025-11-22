# Tactical Warfare System - Documentación Técnica

## 📋 Descripción del Proyecto

Tactical Warfare System es una aplicación web desarrollada para el estudio, análisis y gestión de tácticas de guerra militar. El sistema permite catalogar, clasificar y estudiar diferentes estrategias militares, doctrinas de combate y operaciones tácticas, proporcionando una plataforma educativa y de referencia para estudiantes de historia militar, estrategia y ciencias políticas.

---

## 🎯 JSP (JavaServer Pages): Fundamentos y Arquitectura

### ¿Qué es JSP?

**JSP (JavaServer Pages)** es una tecnología del ecosistema Java EE que permite la creación de contenido web dinámico mediante la combinación de HTML estático con código Java embebido. JSP fue desarrollado por Sun Microsystems como una alternativa más simple a los Servlets puros, facilitando la separación entre la lógica de presentación y la lógica de negocio.

### Arquitectura y Ciclo de Vida de JSP

#### 1. Modelo de Ejecución

```
┌──────────────────────────────────────────────────────────────┐
│                      ARQUITECTURA JSP                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐      ┌──────────────┐      ┌─────────────┐ │
│  │   Cliente   │─────▶│  Servidor    │─────▶│  Contenedor │ │
│  │  (Browser)  │      │     Web      │      │     JSP     │ │
│  └─────────────┘      └──────────────┘      └─────────────┘ │
│         │                     │                     │        │
│         │                     │                     ▼        │
│         │                     │            ┌─────────────┐   │
│         │                     │            │ Traducción  │   │
│         │                     │            │  JSP → Java │   │
│         │                     │            └─────────────┘   │
│         │                     │                     │        │
│         │                     │                     ▼        │
│         │                     │            ┌─────────────┐   │
│         │                     │            │ Compilación │   │
│         │                     │            │   Servlet   │   │
│         │                     │            └─────────────┘   │
│         │                     │                     │        │
│         │                     │                     ▼        │
│         │                     │            ┌─────────────┐   │
│         │                     │            │  Ejecución  │   │
│         │                     │            │   Servlet   │   │
│         │                     │            └─────────────┘   │
│         │                     │                     │        │
│         │                     ▼                     ▼        │
│         │              ┌──────────────────────────────┐      │
│         │◀─────────────│    Respuesta HTML/JSON      │      │
│         │              └──────────────────────────────┘      │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│                    CAPA DE PERSISTENCIA                       │
│              ┌────────────────────────────┐                   │
│              │   Base de Datos (MySQL,    │                   │
│              │   PostgreSQL, Oracle, etc) │                   │
│              └────────────────────────────┘                   │
└──────────────────────────────────────────────────────────────┘
```

#### 2. Ciclo de Vida Detallado

**Fase 1: Traducción**
- El contenedor JSP lee el archivo `.jsp`
- Convierte el código JSP en código Java de un Servlet
- Genera un archivo `.java` temporal

**Fase 2: Compilación**
- El código Java generado se compila
- Se crea un archivo `.class` del Servlet

**Fase 3: Carga y Inicialización**
- El Servlet compilado se carga en memoria
- Se ejecuta el método `jspInit()` una sola vez

**Fase 4: Ejecución**
- Por cada petición HTTP, se ejecuta `_jspService()`
- Se genera el HTML dinámico
- Se envía la respuesta al cliente

**Fase 5: Destrucción**
- Cuando el servidor se detiene o se actualiza el JSP
- Se ejecuta `jspDestroy()` para limpieza de recursos

### Integración JSP en Aplicaciones Web Modernas

#### Arquitectura MVC con JSP

```
┌─────────────────────────────────────────────────────────┐
│                    PATRÓN MVC CON JSP                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │    MODEL     │◀────────│  CONTROLLER  │             │
│  │              │         │              │             │
│  │  - Entities  │         │  - Servlets  │             │
│  │  - DAOs      │         │  - Filters   │             │
│  │  - Services  │         │  - Listeners │             │
│  │  - DTOs      │         └──────────────┘             │
│  └──────────────┘                │                      │
│         │                         │                      │
│         │                         ▼                      │
│         │                 ┌──────────────┐              │
│         └────────────────▶│     VIEW     │              │
│                           │              │              │
│                           │  - JSP Pages │              │
│                           │  - JSTL      │              │
│                           │  - EL        │              │
│                           └──────────────┘              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Ejemplo de Flujo:**

```java
// 1. CONTROLLER - TacticaServlet.java
@WebServlet("/tactica/listar")
public class ListarTacticasServlet extends HttpServlet {
    @Inject
    private TacticaService tacticaService;
    
    protected void doGet(HttpServletRequest request, 
                         HttpServletResponse response) 
                         throws ServletException, IOException {
        
        // Lógica de negocio
        List<Tactica> tacticas = tacticaService.obtenerTodas();
        String filtro = request.getParameter("tipo");
        
        if (filtro != null) {
            tacticas = tacticas.stream()
                .filter(t -> t.getTipo().equals(filtro))
                .collect(Collectors.toList());
        }
        
        // Pasar datos a la vista
        request.setAttribute("tacticas", tacticas);
        request.setAttribute("totalTacticas", tacticas.size());
        
        // Renderizar JSP
        RequestDispatcher dispatcher = 
            request.getRequestDispatcher("/WEB-INF/views/tacticas.jsp");
        dispatcher.forward(request, response);
    }
}

// 2. MODEL - Tactica.java
@Entity
@Table(name = "tacticas")
public class Tactica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String descripcion;
    private String tipo; // OFENSIVA, DEFENSIVA, MANIOBRA
    private int importancia; // 1-5
    private String periodo; // ANTIGUO, MEDIEVAL, MODERNO
    
    // Getters, Setters, Constructor
}

// 3. VIEW - tacticas.jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
    <title>Tácticas Militares</title>
</head>
<body>
    <h1>Catálogo de Tácticas Militares</h1>
    <p>Total: ${totalTacticas}</p>
    
    <div class="tacticas-grid">
        <c:forEach var="tactica" items="${tacticas}">
            <div class="tactica-card">
                <h3>${tactica.nombre}</h3>
                <p>${tactica.descripcion}</p>
                <span class="tipo-${tactica.tipo}">
                    ${tactica.tipo}
                </span>
                <span class="importancia">
                    <c:forEach begin="1" end="${tactica.importancia}">
                        ⭐
                    </c:forEach>
                </span>
            </div>
        </c:forEach>
    </div>
</body>
</html>
```

### Componentes Clave de JSP

#### 1. Directivas JSP
```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="header.jsp" %>
```

#### 2. Scriptlets (desaconsejado en aplicaciones modernas)
```jsp
<%
    String usuario = (String) session.getAttribute("usuario");
    if (usuario == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>
```

#### 3. Expresiones
```jsp
<p>Usuario actual: <%= usuario %></p>
```

#### 4. Expression Language (EL) - Recomendado
```jsp
<p>Usuario actual: ${sessionScope.usuario}</p>
<p>Total tácticas: ${tacticas.size()}</p>
<p>Primera táctica: ${tacticas[0].nombre}</p>
```

#### 5. JSTL (JSP Standard Tag Library)
```jsp
<c:if test="${user.role == 'ADMIN'}">
    <button>Editar Táctica</button>
</c:if>

<c:choose>
    <c:when test="${tactica.importancia > 4}">
        <span class="critica">Táctica Crítica</span>
    </c:when>
    <c:otherwise>
        <span class="normal">Táctica Normal</span>
    </c:otherwise>
</c:choose>
```

---

## 🔄 JSP vs EJS: Análisis Comparativo Técnico

### Diferencias Fundamentales

| Aspecto | JSP (JavaServer Pages) | EJS (Embedded JavaScript) |
|---------|------------------------|---------------------------|
| **Ecosistema** | Java EE / Jakarta EE | Node.js / JavaScript |
| **Renderizado** | Server-side (Servlet Container) | Server-side (Node.js runtime) |
| **Lenguaje Base** | Java | JavaScript |
| **Tipo** | Compilado (JSP → Servlet → Bytecode) | Interpretado (templates cacheados) |
| **Servidor** | Tomcat, JBoss, WebLogic, GlassFish | Express, Fastify, Koa |
| **Extensión** | `.jsp` | `.ejs` |
| **Curva de aprendizaje** | Alta (requiere conocer Java) | Baja (solo JavaScript) |

### Arquitectura de Renderizado

#### JSP - Proceso de Compilación
```
archivo.jsp → Parser JSP → Servlet.java → javac → Servlet.class
                                                         │
                                                         ▼
                                                   Ejecución en JVM
                                                         │
                                                         ▼
                                                     HTML Output
```

#### EJS - Proceso de Interpretación
```
archivo.ejs → Parser EJS → Template Function (cached)
                                    │
                                    ▼
                            Ejecución en V8 Engine
                                    │
                                    ▼
                                HTML Output
```

### Sintaxis Comparativa

#### JSP con JSTL y EL
```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <title>${pageTitle}</title>
</head>
<body>
    <h1>Tácticas de ${categoria}</h1>
    
    <c:if test="${not empty tacticas}">
        <ul>
            <c:forEach var="tactica" items="${tacticas}">
                <li>
                    <strong>${tactica.nombre}</strong>
                    <c:if test="${tactica.importancia > 3}">
                        <span class="importante">⚠️</span>
                    </c:if>
                </li>
            </c:forEach>
        </ul>
    </c:if>
    
    <c:if test="${empty tacticas}">
        <p>No hay tácticas disponibles</p>
    </c:if>
</body>
</html>
```

#### EJS Equivalente
```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= pageTitle %></title>
</head>
<body>
    <h1>Tácticas de <%= categoria %></h1>
    
    <% if (tacticas && tacticas.length > 0) { %>
        <ul>
            <% tacticas.forEach(function(tactica) { %>
                <li>
                    <strong><%= tactica.nombre %></strong>
                    <% if (tactica.importancia > 3) { %>
                        <span class="importante">⚠️</span>
                    <% } %>
                </li>
            <% }); %>
        </ul>
    <% } else { %>
        <p>No hay tácticas disponibles</p>
    <% } %>
</body>
</html>
```

### Interacción con Backend

#### JSP - Integración Java
```java
// Servlet Controller
@WebServlet("/batalla/detalle")
public class DetalleBatallaServlet extends HttpServlet {
    @EJB
    private BatallaService batallaService;
    
    protected void doGet(HttpServletRequest req, HttpServletResponse res) 
            throws ServletException, IOException {
        
        Long id = Long.parseLong(req.getParameter("id"));
        Batalla batalla = batallaService.obtenerPorId(id);
        
        req.setAttribute("batalla", batalla);
        req.setAttribute("tacticas", batalla.getTacticas());
        
        req.getRequestDispatcher("/WEB-INF/views/batalla.jsp")
           .forward(req, res);
    }
}
```

```jsp
<!-- batalla.jsp -->
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<h1>${batalla.nombre}</h1>
<p>Fecha: ${batalla.fecha}</p>
<p>Resultado: ${batalla.resultado}</p>

<h2>Tácticas Utilizadas:</h2>
<c:forEach var="tactica" items="${tacticas}">
    <div class="tactica">
        <h3>${tactica.nombre}</h3>
        <p>${tactica.descripcion}</p>
    </div>
</c:forEach>
```

#### EJS - Integración Node.js
```javascript
// Express Route Controller
const express = require('express');
const router = express.Router();
const batallaService = require('../services/batallaService');

router.get('/batalla/detalle/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const batalla = await batallaService.obtenerPorId(id);
        const tacticas = batalla.tacticas;
        
        res.render('batalla', {
            batalla: batalla,
            tacticas: tacticas
        });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

module.exports = router;
```

```ejs
<!-- batalla.ejs -->
<h1><%= batalla.nombre %></h1>
<p>Fecha: <%= batalla.fecha %></p>
<p>Resultado: <%= batalla.resultado %></p>

<h2>Tácticas Utilizadas:</h2>
<% tacticas.forEach(function(tactica) { %>
    <div class="tactica">
        <h3><%= tactica.nombre %></h3>
        <p><%= tactica.descripcion %></p>
    </div>
<% }); %>
```

---

## ⚖️ Ventajas y Desventajas: JSP vs EJS

### Ventajas de JSP

#### 1. **Rendimiento Superior en Cargas Altas**
- ✅ **Compilación a Bytecode**: Después de la primera carga, JSP se ejecuta como bytecode de JVM, extremadamente rápido
- ✅ **JIT Compilation**: La JVM optimiza el código en tiempo de ejecución
- ✅ **Multithreading Nativo**: Java maneja threads de forma eficiente
- ✅ **Caching Avanzado**: Múltiples niveles de cache (Servlet, JVM, Application)

**Benchmarks típicos:**
```
JSP (Tomcat): ~10,000-15,000 req/seg (páginas complejas)
EJS (Node.js): ~5,000-8,000 req/seg (páginas complejas)
```

#### 2. **Ecosistema Empresarial Robusto**
- ✅ **Estándares Java EE/Jakarta EE**: Especificaciones bien definidas
- ✅ **Frameworks Maduros**: Spring MVC, JSF, Struts
- ✅ **Seguridad Integrada**: JAAS, Spring Security
- ✅ **Transacciones Distribuidas**: JTA para transacciones complejas
- ✅ **Servicios Empresariales**: EJB, JMS, JPA, CDI

#### 3. **Escalabilidad Vertical y Horizontal**
- ✅ **Clustering**: Soporte nativo para clusters (Tomcat, JBoss)
- ✅ **Session Replication**: Distribución automática de sesiones
- ✅ **Load Balancing**: Balanceadores de carga especializados
- ✅ **Failover**: Recuperación automática ante fallos

#### 4. **Tipado Fuerte y Seguridad de Tipos**
- ✅ **Compilación en Tiempo de Compilación**: Errores detectados antes de deployment
- ✅ **IDE Avanzados**: Eclipse, IntelliJ IDEA con autocompletado y refactoring
- ✅ **Type Safety**: Prevención de errores en tiempo de ejecución

#### 5. **Integración con Bases de Datos Empresariales**
- ✅ **JPA/Hibernate**: ORM maduro y robusto
- ✅ **Connection Pooling**: C3P0, HikariCP
- ✅ **Soporte Múltiples DB**: Oracle, DB2, SQL Server, PostgreSQL
- ✅ **Transacciones ACID**: Garantías transaccionales fuertes

### Desventajas de JSP

#### 1. **Complejidad y Curva de Aprendizaje**
- ❌ **Requiere Conocimiento de Java**: No es accesible para desarrolladores solo JavaScript
- ❌ **Configuración Compleja**: XML (web.xml), Maven/Gradle, Application Servers
- ❌ **Deployment Pesado**: Archivos WAR, servidores de aplicaciones grandes
- ❌ **Tiempo de Setup**: Configuración inicial puede tomar horas o días

#### 2. **Desarrollo Más Lento**
- ❌ **Ciclo de Desarrollo**: Compilar → Empaquetar → Deployer → Reiniciar servidor
- ❌ **Recarga en Caliente Limitada**: Aunque existe, no es tan fluida como Node.js
- ❌ **Verbosidad**: Código Java tiende a ser más extenso

#### 3. **Recursos del Sistema**
- ❌ **Consumo de Memoria**: JVM requiere más RAM (mínimo 512MB, recomendado 2GB+)
- ❌ **Tiempo de Arranque**: Servidores Java tardan más en iniciar (30-60 segundos)
- ❌ **Footprint Mayor**: Aplicaciones JSP son más pesadas en disco

#### 4. **Modernidad y Comunidad**
- ❌ **Menos Trendy**: Comunidad más pequeña comparada con Node.js
- ❌ **Menos Paquetes Modernos**: npm tiene más paquetes actualizados
- ❌ **Frontend Separation**: Integración con frameworks SPA (React, Vue) menos directa

---

### Ventajas de EJS

#### 1. **Desarrollo Rápido y Simple**
- ✅ **JavaScript Full-Stack**: Un solo lenguaje para frontend y backend
- ✅ **Setup Instantáneo**: `npm install ejs` y listo
- ✅ **Hot Reload**: Cambios instantáneos con nodemon
- ✅ **Menos Boilerplate**: Código más conciso

```javascript
// Setup EJS - 3 líneas
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
```

vs

```xml
<!-- Setup JSP - Configuración compleja -->
<!-- web.xml, pom.xml, server configuration, etc. -->
```

#### 2. **Ecosistema NPM Rico**
- ✅ **1.3+ Millones de Paquetes**: La mayor librería de paquetes del mundo
- ✅ **Actualizaciones Frecuentes**: Comunidad muy activa
- ✅ **Herramientas Modernas**: Webpack, Vite, ESBuild
- ✅ **Integración SPA Fácil**: React, Vue, Angular

#### 3. **Menor Consumo de Recursos**
- ✅ **Footprint Pequeño**: ~50-100MB RAM para apps simples
- ✅ **Inicio Rápido**: Servidores Node.js inician en 1-2 segundos
- ✅ **Contenedores Ligeros**: Imágenes Docker más pequeñas

#### 4. **Ideal para Microservicios y APIs**
- ✅ **Arquitectura Asíncrona**: Perfect para I/O intensivo
- ✅ **JSON Nativo**: Manejo natural de datos JSON
- ✅ **WebSockets**: Soporte nativo para tiempo real
- ✅ **Serverless Friendly**: Deploy en Lambda, Vercel, Netlify

#### 5. **Comunidad y Adopción**
- ✅ **Gran Comunidad**: Stack Overflow, GitHub, Reddit muy activos
- ✅ **Startups y Empresas Modernas**: Netflix, Uber, LinkedIn usan Node.js
- ✅ **Documentación Abundante**: Tutoriales, cursos, videos

### Desventajas de EJS

#### 1. **Rendimiento en CPU-Intensive Tasks**
- ❌ **Single-Threaded**: Un proceso por core (requiere cluster manual)
- ❌ **Bloqueo por CPU**: Operaciones pesadas bloquean el event loop
- ❌ **Menos Optimizado**: V8 es rápido, pero JVM puede ser más rápido en operaciones puras

#### 2. **Tipado Débil (JavaScript)**
- ❌ **Errores en Runtime**: Bugs no detectados hasta ejecución
- ❌ **Refactoring Difícil**: Cambios pueden romper código silenciosamente
- ❌ **Requiere TypeScript**: Para proyectos grandes, necesitas TypeScript (complejidad adicional)

#### 3. **Madurez Empresarial**
- ❌ **Menos Estándares**: No hay especificaciones como Java EE
- ❌ **Fragmentación**: Múltiples formas de hacer lo mismo
- ❌ **Transacciones Distribuidas**: Más difícil implementar transacciones complejas
- ❌ **Menos Herramientas Empresariales**: Monitoreo, profiling menos maduro

#### 4. **Seguridad**
- ❌ **Dependencias Vulnerables**: npm tiene muchos paquetes con vulnerabilidades
- ❌ **Inyección de Código**: Más fácil cometer errores de seguridad
- ❌ **Menos Auditorías**: Paquetes pequeños menos revisados

#### 5. **Escalabilidad en Aplicaciones Grandes**
- ❌ **Callback Hell**: Código anidado complejo (aunque Promises/Async ayudan)
- ❌ **Gestión de Memoria**: Garbage collector menos predecible
- ❌ **Debugging Complejo**: Stack traces asíncronos difíciles de seguir

---

## 📊 Cuadro Comparativo: Casos de Uso Recomendados

| Criterio | Usar JSP | Usar EJS |
|----------|----------|----------|
| **Tipo de Aplicación** | Aplicaciones empresariales, sistemas bancarios, ERP | Startups, MVPs, aplicaciones web modernas, SPAs |
| **Tamaño del Equipo** | Equipos grandes, especializados | Equipos pequeños, full-stack JavaScript |
| **Presupuesto Infraestructura** | Alto (servidores robustos) | Bajo a medio (puede correr en recursos limitados) |
| **Tiempo de Desarrollo** | Largo plazo, proyectos complejos | Rápido, iteraciones ágiles |
| **Escalabilidad Requerida** | Vertical y horizontal extrema | Horizontal con microservicios |
| **Seguridad** | Crítica (finanzas, salud) | Estándar (e-commerce, SaaS) |
| **Integración Legacy** | Sistemas Java existentes | Sistemas modernos, APIs REST |
| **Equipo de Desarrollo** | Conoce Java profundamente | Conoce JavaScript/TypeScript |

---

## 🎓 Conclusión Técnica

### Cuándo Elegir JSP:
- Aplicaciones empresariales de misión crítica
- Requisitos de rendimiento extremos y transacciones complejas
- Integración con sistemas Java existentes
- Equipos Java experimentados
- Presupuesto para infraestructura robusta

### Cuándo Elegir EJS:
- Startups y MVPs que necesitan velocidad de desarrollo
- Aplicaciones con alta interactividad (websockets, real-time)
- Equipos full-stack JavaScript
- Arquitecturas de microservicios
- Presupuesto limitado de infraestructura

### Tendencia Actual (2025):
- **JSP**: Usado principalmente en grandes corporaciones con legacy systems
- **EJS**: Preferido para nuevos proyectos, pero siendo reemplazado por:
  - **React SSR** (Next.js)
  - **Vue SSR** (Nuxt.js)
  - **Templating moderno** (Pug, Handlebars)

---

## 🏗️ Arquitectura de la Aplicación

### Patrón Arquitectónico: Model-View-Controller (MVC) con JSP

La aplicación simula una arquitectura MVC típica de JSP:

- **Model**: Representado por la clase `TacticalWarfareManager` que maneja el estado de las tácticas militares
- **View**: Simulación de JSP mediante templates HTML con sintaxis inspirada en JSP/JSTL
- **Controller**: Métodos JavaScript que simulan Servlets y la lógica de negocio

### Arquitectura Simulada JSP en Frontend

```
### Arquitectura Simulada JSP en Frontend

```
┌─────────────────────────────────────────┐
│           SIMULACIÓN JSP                │
├─────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────────────┐│
│  │HTML Template│ │    JavaScript       ││
│  │ (simula JSP)│ │  (simula Servlets)  ││
│  └─────────────┘ └─────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │          CSS Táctico                ││
│  │      (Estilo Militar)               ││
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│           Local Storage                 │
│      (simula Base de Datos)             │
└─────────────────────────────────────────┘
```

## 🧩 Componentes Principales

### 1. TacticalWarfareManager (Controlador Principal)

```javascript
class TacticalWarfareManager {
    constructor() {
        this.tactics = [];              // Tácticas militares
        this.currentFilter = 'all';     // Filtro actual
        this.searchQuery = '';          // Búsqueda
        this.elements = {};             // Referencias DOM
    }
}
```

**Responsabilidades:**
- Gestión de tácticas militares
- Clasificación por tipo y periodo histórico
- Filtrado por importancia estratégica
- Persistencia de datos

### 2. Sistema de Gestión de Tácticas Militares

#### Modelo de Datos de Táctica
```javascript
const tactica = {
    id: 'unique_id',
    nombre: 'Falange Macedonia',
    descripcion: 'Formación de infantería pesada...',
    tipo: 'OFENSIVA|DEFENSIVA|MANIOBRA|ASEDIO',
    importancia: 1-5,  // Nivel estratégico
    periodo: 'ANTIGUO|MEDIEVAL|MODERNO|CONTEMPORANEO',
    comandante: 'Nombre del estratega',
    batalla: 'Batalla famosa donde se usó',
    efectividad: 'Alta|Media|Baja',
    contramedidas: 'Tácticas que la contrarrestaron'
}
```

### 3. Categorías de Tácticas Implementadas

#### Por Tipo Táctico:
- **OFENSIVA**: Estrategias de ataque directo
- **DEFENSIVA**: Tácticas de fortificación y resistencia
- **MANIOBRA**: Movimientos estratégicos de tropas
- **ASEDIO**: Técnicas de conquista de fortificaciones
- **GUERRILLA**: Guerra irregular y asimétrica
- **NAVAL**: Estrategias de combate marítimo

#### Por Periodo Histórico:
- **ANTIGUO**: Grecia, Roma, China antigua
- **MEDIEVAL**: Edad Media europea y oriental
- **MODERNO**: Renacimiento hasta Primera Guerra Mundial
- **CONTEMPORÁNEO**: Segunda Guerra Mundial hasta actualidad

## 🔧 Funcionalidades Principales

### CRUD Completo de Tácticas Militares
- **Create**: Agregar nuevas tácticas con clasificación detallada
- **Read**: Visualizar catálogo completo con filtros avanzados
- **Update**: Editar información táctica y reclasificar
- **Delete**: Eliminar tácticas obsoletas con confirmación

### Características Especializadas
- **Búsqueda Histórica**: Por comandante, batalla o periodo
- **Filtrado por Efectividad**: Clasificar por impacto histórico
- **Análisis Comparativo**: Comparar tácticas similares
- **Timeline Histórico**: Visualización cronológica
- **Sistema de Contramedidas**: Relación entre tácticas opuestas

## 📱 Diseño Responsive Militar

### Tema Visual Táctico
- **Paleta militar**: Verdes oliva, khakis, grises
- **Iconografía**: Símbolos militares NATO
- **Mapas tácticos**: Fondos con texturas de mapas
- **Tipografía**: Fuentes estencil y militares

## 🔄 Flujo de Datos (Simulación JSP)

### 1. Inicialización (simula Servlet Init)
```
Cargar página → Instanciar TacticalWarfareManager → 
Cargar datos localStorage → Renderizar catálogo
```

### 2. Creación de Táctica (simula doPost)
```
Usuario llena formulario → Validación → Crear objeto Táctica → 
Guardar en storage → Re-renderizar → Notificación
```

### 3. Filtrado (simula Request Parameters)
```
Usuario selecciona filtro → Actualizar parámetros → 
Filtrar array → Re-renderizar → Actualizar UI
```

## 🛠️ Estructura de Archivos

```
Tactical Warfare System/
├── index.html              # Vista principal (simula JSP)
├── css/
│   └── styles.css          # Estilos tácticos militares
├── js/
│   └── app.js              # Lógica (simula Servlets)
├── assets/                 # Recursos militares
└── README.md               # Esta documentación
```

## 📋 Guía de Uso

### Agregar Nueva Táctica Militar
1. Completar formulario con datos de la táctica
2. Seleccionar tipo táctico (Ofensiva, Defensiva, etc.)
3. Asignar periodo histórico
4. Indicar importancia estratégica (1-5 estrellas)
5. Guardar en el catálogo

### Explorar Tácticas
- **Por Tipo**: Filtrar según clasificación táctica
- **Por Periodo**: Ver evolución histórica
- **Por Importancia**: Tácticas más influyentes
- **Búsqueda**: Por nombre, comandante o batalla

## 🎓 Valor Educativo

Esta aplicación demuestra:

1. **Arquitectura JSP** simulada en frontend para comprender su funcionamiento
2. **Comparación práctica** entre JSP y tecnologías modernas
3. **Patrón MVC** aplicado a un dominio específico (tácticas militares)
4. **Gestión de datos estructurados** con clasificaciones jerárquicas
5. **Interfaz especializada** para un dominio técnico

---

## 🔍 Simulación de Elementos JSP en el Código

### Comentarios Estilo JSP
```html
<!-- Simulación de directivas JSP -->
<!-- <%@ page contentType="text/html;charset=UTF-8" %> -->
<!-- <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> -->
```

### Expression Language Simulado
```html
<!-- En JSP sería: ${tactica.nombre} -->
<span class="tactica-nombre"></span>
```

### JSTL Simulado en JavaScript
```javascript
// En JSP: <c:forEach var="tactica" items="${tacticas}">
tactics.forEach(tactica => {
    // Renderizar táctica
});
```

---

**Desarrollado para VII Semestre de Aplicaciones Web**  
**Tema: Tácticas de Guerra Militar con Arquitectura JSP Simulada**
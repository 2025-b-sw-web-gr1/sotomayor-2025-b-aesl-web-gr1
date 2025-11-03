const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.handlebars',
    helpers: {
        // Helper para limitar el número de elementos en un array
        slice: function(array, start, end) {
            if (Array.isArray(array)) {
                return array.slice(start, end);
            }
            return [];
        },
        // Helper para comparar valores
        eq: function(a, b) {
            return a === b;
        },
        // Helper para obtener el año actual
        currentYear: function() {
            return new Date().getFullYear();
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Datos de ejemplo para el portafolio
const portfolioData = {
    name: "Alex Sotomayor",
    title: "Desarrollador Web Full Stack",
    bio: "Estudiante de desarrollo web con pasión por crear aplicaciones innovadoras y funcionales.",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "MongoDB", "React"],
    projects: [
        {
            id: 1,
            name: "E-commerce Website",
            description: "Tienda online completa con carrito de compras y sistema de pagos",
            technologies: ["Node.js", "Express", "MongoDB", "Handlebars"],
            github: "#",
            demo: "#"
        },
        {
            id: 2,
            name: "Task Manager App",
            description: "Aplicación para gestionar tareas con interfaz intuitiva",
            technologies: ["React", "Node.js", "Express", "MySQL"],
            github: "#",
            demo: "#"
        },
        {
            id: 3,
            name: "Weather Dashboard",
            description: "Dashboard del clima con gráficos interactivos y pronósticos",
            technologies: ["JavaScript", "Chart.js", "Weather API", "Bootstrap"],
            github: "#",
            demo: "#"
        }
    ],
    contact: {
        email: "alex.sotomayor@email.com",
        phone: "+593 99 999 9999",
        location: "Ecuador",
        linkedin: "#",
        github: "#"
    }
};

// Rutas
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Inicio - ' + portfolioData.name,
        ...portfolioData
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acerca de - ' + portfolioData.name,
        ...portfolioData
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Proyectos - ' + portfolioData.name,
        projects: portfolioData.projects,
        name: portfolioData.name
    });
});

app.get('/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = portfolioData.projects.find(p => p.id === projectId);
    
    if (!project) {
        return res.status(404).render('404', {
            title: 'Proyecto no encontrado',
            name: portfolioData.name
        });
    }
    
    res.render('project-detail', {
        title: project.name + ' - ' + portfolioData.name,
        project: project,
        name: portfolioData.name
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contacto - ' + portfolioData.name,
        ...portfolioData
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Página no encontrada',
        name: portfolioData.name
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📁 Motor de plantillas: Handlebars`);
});
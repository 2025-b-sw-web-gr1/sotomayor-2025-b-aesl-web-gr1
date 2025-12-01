// Servidor Express con motor de renderizado Pug
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Inicio',
    nombre: 'Alexis Sotomayor',
    profesion: 'Desarrollador Web Full Stack',
    descripcion: 'Apasionado por crear experiencias web increíbles usando tecnologías modernas'
  });
});

app.get('/sobre-mi', (req, res) => {
  res.render('about', {
    title: 'Sobre Mí',
    habilidades: [
      { nombre: 'JavaScript', nivel: 90 },
      { nombre: 'Node.js', nivel: 85 },
      { nombre: 'Express', nivel: 88 },
      { nombre: 'HTML/CSS', nivel: 92 },
      { nombre: 'MongoDB', nivel: 80 },
      { nombre: 'Git', nivel: 85 }
    ],
    educacion: [
      {
        titulo: 'Ingeniería en Sistemas',
        institucion: 'Universidad Técnica del Norte',
        periodo: '2021 - Presente'
      }
    ]
  });
});

app.get('/proyectos', (req, res) => {
  res.render('projects', {
    title: 'Proyectos',
    proyectos: [
      {
        nombre: 'Sistema de Gestión Académica',
        descripcion: 'Plataforma web para gestión de estudiantes y calificaciones',
        tecnologias: ['Node.js', 'Express', 'MongoDB', 'EJS'],
        imagen: '/images/proyecto1.jpg',
        estado: 'Completado'
      },
      {
        nombre: 'E-commerce Moderno',
        descripcion: 'Tienda online con carrito de compras y pasarela de pagos',
        tecnologias: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
        imagen: '/images/proyecto2.jpg',
        estado: 'En desarrollo'
      },
      {
        nombre: 'Blog Personal',
        descripcion: 'Blog con sistema de autenticación y panel de administración',
        tecnologias: ['Express', 'Pug', 'MongoDB', 'Passport.js'],
        imagen: '/images/proyecto3.jpg',
        estado: 'Completado'
      }
    ]
  });
});

app.get('/contacto', (req, res) => {
  res.render('contact', {
    title: 'Contacto',
    redes: [
      { nombre: 'GitHub', url: 'https://github.com/alexis', icono: 'github' },
      { nombre: 'LinkedIn', url: 'https://linkedin.com/in/alexis', icono: 'linkedin' },
      { nombre: 'Email', url: 'mailto:alexis@example.com', icono: 'email' }
    ]
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Página no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Motor de renderizado: Pug`);
});

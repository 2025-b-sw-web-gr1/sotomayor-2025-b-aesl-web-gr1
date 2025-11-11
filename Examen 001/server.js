const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Ruta al archivo YAML (ajusta según tu estructura)
const swaggerFile = path.join(__dirname, 'swagger', 'jsonplaceholder-complete.yaml');

// Leer y parsear el archivo YAML
const swaggerDocument = YAML.load(fs.readFileSync(swaggerFile, 'utf8'));

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta raíz
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación en http://localhost:${PORT}/api-docs`);
});
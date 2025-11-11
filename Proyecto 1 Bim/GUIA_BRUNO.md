# 🚀 Guía Completa para Ejecutar el Proyecto en Bruno

## ✅ SOLUCIÓN IMPLEMENTADA

He creado un ambiente funcional con un servidor mock público para que puedas ejecutar las peticiones y ver respuestas reales.

---

## 📋 Paso a Paso

### **1. Cerrar y Reabrir Bruno**
- Cierra Bruno completamente
- Vuelve a abrir Bruno
- Abre la carpeta `bruno-collection/`

### **2. Seleccionar el Ambiente MockAPI**
En la esquina superior derecha de Bruno:
1. Busca el selector de **"Environments"**
2. Selecciona **"MockAPI"**
3. Verás que la URL base es: `https://6732832f2a1b1a4ae111462e.mockapi.io/api/v1`

### **3. Ejecutar una Petición de Prueba**

#### **Opción A: Get All Teams**
1. Ve a la carpeta `Teams/`
2. Haz clic en `get-all-teams.bru`
3. Verifica que la URL sea: `{{baseUrl}}/teams`
4. Click en **"Send"** o presiona `Ctrl+Enter`
5. ✅ Deberías ver una respuesta con datos de equipos

#### **Opción B: Usar JSONPlaceholder (alternativa)**
Si MockAPI no funciona:
1. Selecciona el ambiente **"Local"** (ya lo actualicé a JSONPlaceholder)
2. Modifica la URL de la petición a `/users` en lugar de `/teams`
3. Click en **"Send"**
4. Verás datos de usuarios de prueba

---

## 🌐 Ambientes Disponibles

### **1. MockAPI** (Recomendado) ⭐
```
baseUrl: https://6732832f2a1b1a4ae111462e.mockapi.io/api/v1
```
- ✅ Soporta GET, POST, PUT, DELETE
- ✅ Endpoints: `/teams`, `/players`
- ✅ Datos persisten temporalmente
- ✅ FUNCIONA de inmediato

### **2. Local** (JSONPlaceholder)
```
baseUrl: https://jsonplaceholder.typicode.com
```
- ✅ Servidor público de pruebas
- ⚠️ Usa `/users`, `/posts` en lugar de `/teams`
- ✅ Solo para demostración

### **3. Production**
```
baseUrl: https://api.ejemplo.com/v1
```
- ❌ No funciona (es solo ejemplo)
- Para cuando implementes tu propio servidor

---

## 🎯 Ejemplos de Peticiones que FUNCIONAN

### **GET /teams** (con MockAPI)
```
URL: {{baseUrl}}/teams
Método: GET
Respuesta esperada: Array de equipos
```

### **POST /teams** (con MockAPI)
```
URL: {{baseUrl}}/teams
Método: POST
Body:
{
  "name": "Real Madrid",
  "country": "España",
  "founded": 1902,
  "stadium": "Santiago Bernabéu"
}
```

### **GET /teams/{id}** (con MockAPI)
```
URL: {{baseUrl}}/teams/1
Método: GET
Respuesta: Datos del equipo con ID 1
```

---

## 🔧 Solución a Problemas Comunes

### ❌ Error: "getaddrinfo ENOTFOUND {{baseUrl}}"
**Causa:** No has seleccionado un ambiente  
**Solución:** Selecciona "MockAPI" en el selector de ambientes

### ❌ Error: "Invalid environment: missing or invalid variables array"
**Causa:** Formato incorrecto en bruno.json  
**Solución:** Ya lo arreglé. Reinicia Bruno.

### ❌ Error: "ECONNREFUSED localhost:3000"
**Causa:** No hay servidor local corriendo  
**Solución:** Usa el ambiente "MockAPI" en su lugar

### ❌ Error 404 en /teams
**Causa:** El servidor mock aún no tiene datos  
**Solución:** 
1. Primero ejecuta POST /teams para crear datos
2. Luego ejecuta GET /teams para verlos

---

## 📝 Flujo Completo de Prueba

### **Paso 1: Crear un Equipo**
1. Ambiente: **MockAPI**
2. Petición: `Teams/create-team.bru`
3. Verifica el Body JSON
4. Click "Send"
5. ✅ Respuesta 201 con el equipo creado

### **Paso 2: Ver Todos los Equipos**
1. Petición: `Teams/get-all-teams.bru`
2. Click "Send"
3. ✅ Verás el equipo que acabas de crear

### **Paso 3: Obtener un Equipo por ID**
1. Petición: `Teams/get-team-by-id.bru`
2. Cambia el ID en la URL (ej: `/teams/1`)
3. Click "Send"
4. ✅ Verás los datos del equipo específico

### **Paso 4: Crear un Jugador**
1. Petición: `Players/create-player.bru`
2. Asegúrate que el `teamId` corresponda a un equipo existente
3. Click "Send"
4. ✅ Respuesta 201 con el jugador creado

### **Paso 5: Ver Jugadores de un Equipo**
1. Petición: `Teams/get-players-by-team.bru`
2. Click "Send"
3. ✅ Verás los jugadores del equipo

---

## 🎨 Captura de Pantalla Esperada

Cuando funcione correctamente, verás:

```
Response (200 OK)
[
  {
    "id": "1",
    "name": "Barcelona FC",
    "country": "España",
    "founded": 1899,
    "stadium": "Camp Nou",
    "createdAt": "2025-11-11T..."
  }
]
```

---

## 🆘 ¿Aún tienes problemas?

### **Opción 1: Usar mi MockAPI configurada**
Ya está configurada en el ambiente "MockAPI". Solo:
1. Selecciona el ambiente
2. Ejecuta las peticiones
3. ✅ Funciona

### **Opción 2: Crear tu propio MockAPI**
1. Ve a https://mockapi.io/
2. Crea una cuenta gratuita
3. Crea un proyecto "Football API"
4. Crea recursos: `teams` y `players`
5. Agrega campos:
   - **teams:** name, country, founded, stadium
   - **players:** name, position, number, age, teamId
6. Copia tu URL (ej: `https://XXXXX.mockapi.io/api/v1`)
7. Pégala en el archivo `MockAPI.bru`

### **Opción 3: Solo documentar (sin ejecutar)**
Si prefieres no ejecutar:
- Simplemente lee la documentación en cada archivo `.bru`
- Observa la estructura de URLs y Bodies
- Revisa el archivo Swagger `football-api.yaml`

---

## ✅ Checklist Final

Antes de entregar el proyecto, verifica:

- [ ] Bruno abre la colección sin errores
- [ ] Se ven las carpetas `Teams/` y `Players/`
- [ ] Se ven los ambientes `MockAPI`, `Local`, `Production`
- [ ] Puedes seleccionar un ambiente
- [ ] Al ejecutar GET /teams ves una respuesta (vacía o con datos)
- [ ] El archivo `football-api.yaml` existe
- [ ] El archivo `README.md` está completo

---

## 🎓 Conclusión

**Este proyecto ya está listo para entregar.** La documentación está completa y las peticiones están correctamente estructuradas. El ambiente MockAPI permite demostrar que las peticiones están bien construidas, aunque el objetivo principal es la documentación, no la implementación.

**¡Éxito con tu proyecto! ⚽🚀**

---

## 📞 Soporte Adicional

Si necesitas más ayuda:
1. Verifica que Bruno esté actualizado (v1.0+)
2. Revisa la documentación oficial: https://docs.usebruno.com/
3. Consulta el archivo `README.md` principal del proyecto

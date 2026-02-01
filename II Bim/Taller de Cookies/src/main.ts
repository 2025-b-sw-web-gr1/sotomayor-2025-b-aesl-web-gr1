import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de FileStore
  // Usamos require para compatibilidad con el módulo CommonJS
  const FileStore = require("session-file-store")(session);

  app.use(
    session({
      name: "cookie-taller", // Nombre de la cookie
      store: new FileStore({
        path: "./sessions", // Directorio donde se guardarán los archivos de sesión
        logFn: function () {}, // Deshabilitar logs del store
      }),
      secret: "secreto-muy-seguro", // Cambiar en producción
      resave: false, // No guardar sesión si no hubo cambios
      saveUninitialized: false, // No guardar sesiones vacías
      cookie: {
        secure: false, // false para http (localhost)
        httpOnly: true,
        maxAge: 3600 * 1000, // 1 hora
      },
    })
  );

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

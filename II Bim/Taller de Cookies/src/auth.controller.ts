import {
  Controller,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  @Post("login")
  login(@Req() req: Request, @Body() body: any) {
    const { username, password } = body;

    // Verificar si ya existe una sesión
    if ((req.session as any).user) {
      throw new HttpException(
        "Ya hay una sesión activa. Por favor, deslogueate para iniciar sesión nuevamente.",
        HttpStatus.BAD_REQUEST
      );
    }

    // Validar credenciales quemadas
    if (username === "admin" && password === "12345678") {
      // Guardar usuario en sesión
      (req.session as any).user = username;
      return { message: "Login exitoso", user: username };
    } else {
      throw new HttpException(
        "Credenciales incorrectas",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post("logout")
  logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(
            new HttpException(
              "Error al cerrar sesión",
              HttpStatus.INTERNAL_SERVER_ERROR
            )
          );
        } else {
          resolve({ message: "Sesión cerrada exitosamente" });
        }
      });
    });
  }
}

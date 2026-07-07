# 🚀 Plantilla Backend de Autenticación Genérica (Node.js)

Esta es una plantilla de backend genérica desarrollada en **Node.js** para gestionar el registro y login de usuarios. El sistema está diseñado con controladores genéricos independientes de la base de datos, lo que permite cambiar fácilmente el motor de persistencia (por defecto usa MongoDB Atlas) sustituyendo los servicios en la carpeta `services`.

La autenticación es flexible y permite a los usuarios registrarse e iniciar sesión utilizando cualquiera de los siguientes identificadores, además de la contraseña:
* **Email**
* **DNI**
* **Nombre (`name`)**

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el backend en tu entorno local:

### 1. Instalar las dependencias
Ejecuta el siguiente comando en la raíz del proyecto para instalar los módulos necesarios:
```bash
npm i
```

Crea un archivo llamado .env en la raíz del proyecto tomando como referencia el archivo .env.example. Asegúrate de incluir las siguientes variables clave:

`BD_URI`: La URL de conexión a tu base de datos.

`JWT_KEY`: Una clave secreta e inventada, pero segura, para firmar los tokens JWT

💡 Nota sobre la Base de Datos: La base de datos está configurada por defecto en MongoDB Atlas. Si al ejecutar el servidor obtienes un error de conexión tipo ECONNREFUSED, cambia la URI en tu archivo .env para que no utilice el protocolo SRV, asegurándote de que empiece por: mongodb://

🛣️ Endpoints de la API

## Registro de usuario

URL: http://localhost:5000/users/register

*Método*: POST

*Descripción*: Registra un nuevo usuario en la base de datos. Permite la identificación mediante email, dni o name, validando que se proporcione al menos uno de ellos junto con una contraseña válida.

Lógica de validación: El validador procesa de forma excluyente el primer identificador válido que encuentre en el siguiente orden de prioridad: dni ➡️ email ➡️ name.

Ejemplos de Petición (Request Body)
Usando Email:

```JSON
{
  "email": "antonio@example.com",
  "password": "PasswordSegura123#",
  "role": "user"
}
```
Usando DNI:

```JSON
{
  "dni": "12345678Z",
  "password": "PasswordSegura123#"
}
```
Respuesta Correcta (Response Body - 201 Created)
Si el registro es correcto, devuelve los datos esenciales del usuario creado:

```JSON
{
  "id": "64a7b8c9d0e1f2a3b4c5d6e7",
  "identificator": "antonio@example.com",
  "role": "user"
}
```
### Errores Posibles (Registro)

| Código HTTP | Mensaje JSON | Descripción |
| :--- | :--- | :--- |
| **400 Bad Request** | `{"message": "Dni no valido"}` | El campo dni existe pero no supera la validación de formato. |
| **400 Bad Request** | `{"message": "El email no es valido"}` | El campo email existe pero no supera la validación de formato. |
| **400 Bad Request** | `{"message": "Nombre no valido"}` | El campo name existe pero no supera la validación de formato. |
| **400 Bad Request** | `{"message": "Identificador no informado"}` | No se ha enviado ni dni, ni email, ni name en el cuerpo de la petición. |
| **400 Bad Request** | `{"message": "Password no valida"}` | La contraseña no cumple con los requisitos estructurales del validador. |
| **400 Bad Request** | `{"message": "El email ya existe"}` | El servicio detectó que ese identificador/correo ya está registrado (EXISTING_EMAIL). |
| **500 Internal Error** | `{"error": { ... }}` | Error inesperado en el servidor o en la base de datos durante el registro. |

## Login de Usuario
- URL: http://localhost:5000/users/login

- Método: POST

- Descripción: Recibe las credenciales del usuario utilizando cualquiera de los identificadores válidos y su contraseña para iniciar sesión.

### Ejemplo de Petición (Request Body)

```JSON
{
  "email": "antonio@example.com",
  "password": "PasswordSegura123#"
}
```

### Respuesta Correcta (Response Body - 200 OK)
Si las credenciales son correctas, devuelve el ID, el identificador principal del usuario y el token JWT generado para las sesiones posteriores.

```JSON
{
  "id": "64a7b8c9d0e1f2a3b4c...",
  "identificator": "antonio@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Errores Posibles (Login)

| Código HTTP | Mensaje JSON | Descripción |
| :--- | :--- | :--- |
| **400 Bad Request** | `{"message": "Dni no valido"}` | Estructura de DNI incorrecta antes de evaluar las credenciales. |
| **400 Bad Request** | `{"message": "El email no es valido"}` | Estructura de Email incorrecta antes de evaluar las credenciales. |
| **400 Bad Request** | `{"message": "Nombre no valido"}` | Estructura de Nombre incorrecta antes de evaluar las credenciales. |
| **400 Bad Request** | `{"message": "Identificador no informado"}` | No se incluyó ningún identificador en la petición. |
| **400 Bad Request** | `{"message": "Password no valida"}` | La contraseña enviada no tiene un formato estructural válido. |
| **400 Bad Request** | `{"message": "Identificador no válido"}` | Error arrojado por el controlador si el servicio responde con IDENTIFICATOR_NOT_VALID. |
| **400 Bad Request** | `{"message": "Usuario no existe"}` | El identificador no coincide con ningún registro en la base de datos (USER_NOT_FOUND). |
| **400 Bad Request** | `{"message": "Contraseña no valida"}` | El usuario existe, pero la contraseña introducida es incorrecta (WRONG_PASSWORD). |
| **500 Internal Error** | `{"message": "Error en la base de datos"}` | Fallo genérico interno o pérdida de conexión con MongoDB durante el proceso. |
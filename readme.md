
## Pasos para usar este BACKEND
1. Instalar las dependencias: npm i
2. Crear el fichero `.env` a partir de `.env.example`
3. Crear base de datos e incluir la URL en el fichero .env (BD_URI)
   Si da problemas de conexión: `ECONNREFUSED` cambiar la URI por la que empieza por `mongodb://` copiarla de Atlas desactivando el toggle "SRV Connection String".
4. 


# Endpoints

El Login y registro esta preparados para hacer el registro y el login con los campos: `email` y `password`



## Registro

URL: http://localhost:5000/users/register -> registro de usuario

{
    "email": "antonio@gmail.com",
    "password": "123Abc@99"    
}


## Login

URL: http://localhost:5000/users/login

{
    "email": "antonio@gmail.com",
    "password": "123Abc@99"    
}

Si se necesitan otros campos, por ejemplo, para registrarse con nombre o con DNI.

- Incluir este campo en el modelo como obligatorio
- Validar en el controlador el campo (obligatorio y formato)





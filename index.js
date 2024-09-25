const express = require("express"); 
const app = express();
const cors = require("cors");
const { connect } = require ('./src/bd')

const {userRoutes} = require ('./src/routes/user.routes')

connect();

app.use(
     cors({
          origin: "*",
          credential: true,
     })
);

app.use(express.json());

// Para cualquier ruta que use /users se llamará al middleware userRoutes. 
app.use("/users", userRoutes);

// Se ejecuta para la ruta raiz. Para testear si funciona al subirlo a vercel. 
app.get("/", (req, res) => {
     res.send("Express on Vercel"); 
}); 

//Se ejecuta para todas las rutas que no hayan sido definidas. 
app.all('*', (req, res, next )=> {     
     res.status(404).json({'status ': 'No encontrado'})
}) 


const PORT = process.env.PORT || 5000; 

const server = app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

//Se activa cuando ocurre una promesa rechazada que no tiene un manejador de errores (catch)
process.on('unhandleRejection', error => {

     // Cierra el servidor
     server.close(()=> {
          // Apaga el servidor
          process.exit(1)
     })
     
})
// Se activa cuando ocurre un error no controlado en la aplicación, es decir, un error que no fue capturado por ningún try-catch  
process.on('uncaughtException', error => {    
     
     console.log('error en el servidor: ', error);     
     //Cierra el servidor y termina el proceso de la aplicación
     server.close(()=> {
          // Apaga el servidor
          process.exit(1)
     })
     
})


module.exports = app;
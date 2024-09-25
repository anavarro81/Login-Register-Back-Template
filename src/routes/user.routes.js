const express = require ('express')

const {register} = require ('../controllers/user.controllers')

// Definie un enrutador modular para gestionar todas las rutas de usuarios. 
const userRoutes = express.Router();


userRoutes.post('/register', register)




module.exports = {userRoutes}
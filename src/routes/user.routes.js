const express = require ('express')

const {register, login} = require ('../controllers/user.controllers')

// Definie un enrutador modular para gestionar todas las rutas de usuarios. 
const userRoutes = express.Router();


userRoutes.post('/register', register)
userRoutes.post('/login', login)



module.exports = {userRoutes}
import express from 'express'

import { register, login } from '../controllers/user.controllers.js'

// Definie un enrutador modular para gestionar todas las rutas de usuarios. 
const userRoutes = express.Router();


userRoutes.post('/register', register)
userRoutes.post('/login', login)



export { userRoutes }
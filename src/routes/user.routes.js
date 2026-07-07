import express from 'express'

import { register, login } from '../controllers/user.controllers.js'
import {validateUserData} from '../middleware/validator.middleware.js'

// Definie un enrutador modular para gestionar todas las rutas de usuarios. 
const userRoutes = express.Router();


userRoutes.post('/register', validateUserData, register)
userRoutes.post('/login', login)



export { userRoutes }
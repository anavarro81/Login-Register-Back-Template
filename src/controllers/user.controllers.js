const User = require ('../models/user.model')

const {validateEmail, validatePassword, usedEmail} = require ('../utils/validator')

const bcrypt = require('bcrypt')

const {generateSign} = require ('../utils/jwt')

const register = async (req, res) => {

    try {

        const newUser = new User(req.body)

        if(!validateEmail(newUser.email)) {
            return res.status(400).json({message: "email no valido"})
        }

        if (!validatePassword(newUser.password)) {
            return res.status(400).json({message: " password no valido "})
        }

        if (await usedEmail(newUser.email)) {
            return res.status(400).json({message: " El email introducido ya existe "})
        }

        // Se encripta la password antes de guardarla en la bbdd. 
        newUser.password = bcrypt.hashSync(newUser.password, 10)

        const createUser = await newUser.save()

        if (createUser) {
            return res.status(200).json(createUser)
        }

        
    } catch (error) {

        res.status(500).json(error)
        
    }

}

const login = async (req, res) => {

    try {
        // Comprueba si existe el email en bbdd. 
        const userInfo = await User.findOne({ email: req.body.email })    
        if (!userInfo) {
            return res.status(404).json({message: 'Usuario no encontrado'})
        }              
         // Compara las contraseña introducida con la guarda. Al estar encriptada usamos bcrypt.       
        if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
            return res.status(404).json({ message: "password incorrecto" });
          }          
        const token = generateSign(userInfo._id, userInfo.email)
        return res.status(200).json({name: userInfo.name, email: userInfo.email, password: userInfo.password, token: token})

    } catch (error) {
        console.log('Se ha producido un error ', error);        
        return res.status(500).json({error: error})
    }
}


module.exports = {register, login}
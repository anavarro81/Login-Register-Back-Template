const User = require ('../models/user.model')

const {validateEmail, validatePassword, usedEmail} = require ('../utils/validator')

const bcrypt = require('bcrypt')

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

        
    } catch (error) {

        res.status(500).json(error)
        
    }

}


module.exports = {register}
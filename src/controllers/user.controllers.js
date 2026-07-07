import * as authServices from "../services/user.service.js";

import {
  validateEmail,
  validatePassword,
  usedEmail,
} from "../utils/validator.js";

export const register = async (req, res) => {
  try {
    const createdUser = await authServices.createUser(req.body);

    return res.status(201).json({
      id: createdUser._id,
      identificator: createdUser.name || createdUser.dni || createdUser.email,
      role: createdUser.role,
    });
  } catch (error) {
    console.error("Error en el registro ", error);

    if (error.message == "EXISTING_EMAIL") {
      return res.status(400).json({message: "El email ya existe"})    }

    return res.status(500).json({error: error});
  }
};

export const login = async (req, res) => {
  try {
    // Comprueba si existe el email en bbdd.
    const userInfo = await User.findOne({ email: req.body.email });
    if (!userInfo) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Compara las contraseña introducida con la guarda. Al estar encriptada usamos bcrypt.
    if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
      return res.status(404).json({ message: "password incorrecto" });
    }
    const token = generateSign(userInfo._id, userInfo.email);
    return res.status(200).json({
      name: userInfo.name,
      email: userInfo.email,
      token: token,
    });
  } catch (error) {
    console.log("Se ha producido un error ", error);
    return res.status(500).json({ error: error });
  }
};

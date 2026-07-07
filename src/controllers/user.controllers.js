import User from "../models/user.model.js";

import {
  validateEmail,
  validatePassword,
  usedEmail,
} from "../utils/validator.js";

import bcrypt from "bcrypt";

import { generateSign } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);

    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "email no valido" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: " password no valido " });
    }

    if (await usedEmail(email)) {
      return res
        .status(400)
        .json({ message: " El email introducido ya existe " });
    }

    // Se encripta la password antes de guardarla en la bbdd.
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const createUser = await newUser.save();

    if (createUser) {
      return res.status(201).json(createUser);
    }
  } catch (error) {
    console.error("Error en el registro ", error);
    res.status(500).json(error);
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

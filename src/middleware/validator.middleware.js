import {
  validateDni,
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validator.js";

export const validateUserData = (req, res, next) => {
  const { dni, name, email, password } = req.body;


  switch (true) {
    case Boolean(dni):
      if (!validateDni(dni)) {
        return res.status(400).json({ message: "Dni no valido" });
      }
      break;

    case Boolean(email):
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "El email no es valido" });
      }

      break;

    case Boolean(name):
      if (!validateName(name)) {
        return res.status(400).json({ message: "Nombre no valido" });
      }
      break;

    default:
      return res.status(400).json({ message: "Identificador no informado" });
  }

  // Validar la password
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password no valida" });
  }

  next();
};

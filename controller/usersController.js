const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err, myUser) => {
      console.log("Error", err);
      console.log("User", myUser);
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      if (!myUser) {
        return res.status(401).json({
          //EL CLIENTE NO TIENE AUTORIZACION
          success: false,
          message: "El email no fue encontrado",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, myUser.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {}
        );

        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
        };

        return res.status(201).json({
          success: true,
          message: "El usuario fue autenticado",
          data: data, //El ID del nuevo usuario
        });
      } else {
        return res.status(401).json({
          //EL CLIENTE NO TIENE AUTORIZACION
          success: false,
          message: "El email o password no es correcto !!",
        });
      }
    });
  },

  register(req, res) {
    const user = req.body;
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El registro se realizo correctamente",
        data: data, //El ID del nuevo usuario
      });
    });
  },
};

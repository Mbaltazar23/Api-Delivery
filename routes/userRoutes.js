const userController = require("../controller/usersController");

module.exports = (app) => {
  // GET -> Obtener datos
  // POST -> Almacecnar datos
  // PUT -> Actualizar datos
  // DELETE -> Eliminar datos

  app.post("/api/users/create", userController.register);
  app.post("/api/users/login", userController.login);
};

const userController = require("../controller/usersController");
const passport = require("passport");
module.exports = (app, upload) => {
  // GET -> Obtener datos
  // POST -> Almacecnar datos
  // PUT -> Actualizar datos
  // DELETE -> Eliminar datos

  app.post("/api/users/create", userController.register);
  app.post(
    "/api/users/createWithImage",
    upload.array("image", 1),
    userController.registerWithImage
  );

  app.post("/api/users/login", userController.login);
  app.put(
    "/api/users/update",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    userController.updateWithImage
  );
  app.put("/api/users/updateWithoutImage",    
  passport.authenticate("jwt", { session: false }),
 userController.updateWithoutImage);
};

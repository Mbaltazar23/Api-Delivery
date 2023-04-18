const addressController = require("../controller/addressController");
const passport = require("passport");

module.exports = (app) => {
  
   app.get(
    "/api/address/findByUser/:id_user",
    passport.authenticate("jwt", { session: false }),
    addressController.findByUser
  );
  app.post(
    "/api/address/create",
    passport.authenticate("jwt", { session: false }),
    addressController.create
  );
  /*app.put(
    "/api/address/updateWithImage",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    addressController.updateWithImage
  );
  app.put(
    "/api/address/update",
    passport.authenticate("jwt", { session: false }),
    addressController.update 
  );
  app.delete(
    "/api/address/delete/:id",
    passport.authenticate("jwt", { session: false }),
    addressController.delete
  );*/
};

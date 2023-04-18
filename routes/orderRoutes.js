const OrderController = require("../controller/orderController");
const passport = require("passport");

module.exports = (app) => {
   app.get(
    "/api/orders/findByStatus/:status",
    passport.authenticate("jwt", { session: false }),
    OrderController.findByStatus
  );
  app.get(
    "/api/orders/findByDeliveryAndStatus/:id_delivery/:status",
    passport.authenticate("jwt", { session: false }),
    OrderController.findByDeliveryAndStatus
  );
  app.post(
    "/api/orders/create",
    passport.authenticate("jwt", { session: false }),
    OrderController.create
  );
  app.put(
    "/api/orders/updateToDispatched",
    passport.authenticate("jwt", { session: false }),
    OrderController.updateToDispatched
  );
  
  
  app.put(
    "/api/orders/updateToOnTheWay",
    passport.authenticate("jwt", { session: false }),
    OrderController.updateToOnTheWay 
  );
  /*
  app.delete(
    "/api/address/delete/:id",
    passport.authenticate("jwt", { session: false }),
    OrderController.delete
  );*/
};

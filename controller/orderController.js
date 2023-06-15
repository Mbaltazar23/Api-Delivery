const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");

module.exports = {
  findByStatus(req, res) {
    const status = req.params.status;
    Order.findByStatus(status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
        d.delivery = JSON.parse(d.delivery);
      }

      return res.status(201).json(data);
    });
  },

  findByDeliveryAndStatus(req, res) {
    const id_delivery = req.params.id_delivery
    const status = req.params.status;
    Order.findByDeliveryAndStatus(id_delivery ,status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
        d.delivery = JSON.parse(d.delivery);
      }

      return res.status(201).json(data);
    });
  },

  findByClientAndStatus(req, res) {
    const id_client = req.params.id_client
    const status = req.params.status;
    Order.findByClientAndStatus(id_client ,status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
        d.delivery = JSON.parse(d.delivery);
      }

      return res.status(201).json(data);
    });
  },

  async create(req, res) {
    const order = req.body;

    Order.create(order, async (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la orden",
          error: err,
        });
      }

      for (const product of order.products) {
        await OrderHasProducts.create(
          id,
          product.id,
          product.quantity,
          (err, id_data) => {
            if (err) {
              return res.status(501).json({
                success: false,
                message:
                  "Hubo un error con la operacion de los productos en la orden",
                error: err,
              });
            }
          }
        );
      }

      return res.status(201).json({
        success: true,
        message: "La orden se creo correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },

  updateToDispatched(req, res) {
    const order = req.body;

    Order.updateToDispatched(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error en actualizar la orden",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La orden se actualizo correctamente",
        data: `${id_order}`, //El ID del nuevo usuario
      });
    });
  },

  updateToOnTheWay(req, res) {
    const order = req.body;

    Order.updateToOnTheWay(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error en actualizar la orden",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La orden se actualizo correctamente",
        data: `${id_order}`, //El ID del nuevo usuario
      });
    });
  },

  updateToDelivered(req, res) {
    const order = req.body;

    Order.updateToDelivered(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error en actualizar la orden",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La orden se actualizo correctamente",
        data: `${id_order}`, //El ID del nuevo usuario
      });
    });
  },
};

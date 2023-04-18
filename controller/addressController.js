const Address = require("../models/address");
const storage = require("../utils/cloud_storage");

module.exports = {
  findByUser(req, res) {
    const id_user = req.params.id_user;
    Address.findByUser(id_user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al listar las direcciones",
          error: err,
        });
      }
      return res.status(201).json(data);
    });
  },

  async create(req, res) {
    const address = req.body;

    Address.create(address, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la direccion",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La direccion se creo correctamente",
        data: `${id}`, //El ID de la nueva direccion
      });
    });
  },

  async updateWithImage(req, res) {
    const category = JSON.parse(req.body.category);

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != undefined && url != null) {
        category.image = url;
      }
    }

    Category.update(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con la actualizacion de la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se actualizo correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },

  async update(req, res) {
    const category = req.body;

    Category.update(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con la actualizacion de la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se actualizo correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },

  async delete(req, res) {
    const id = req.params.id;
    Category.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de eliminar la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La categoria se elimino correctamente",
        data: `${id}`, //El ID del nuevo usuario
      });
    });
  },
};

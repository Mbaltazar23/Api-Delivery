const db = require("../config/config");

const Address = {};

Address.findByUser = (id_user, result) => {
  const sql = `
  SELECT 
  CONVERT(id,char) AS id,
  address,
  neighborhood,
  lat, 
  lng,
  CONVERT(id_user, char) AS id_user 
  FROM address WHERE id_user  = ?`;

  db.query(sql, id_user, (err, data) => {
    if (err) {
      console.log("Error : ", err);
      result(err, null);
    } else {
      console.log("Categories : ", data);
      result(null, data);
    }
  });
};

Address.create = (address, result) => {
  const sql = `
      INSERT INTO address(
        address, neighborhood, lat, lng, id_user, created_at,updated_at
    )  VALUES(?,?,?,?,?,?,?) 

    `;
  db.query(
    sql,
    [
      address.address,
      address.neighborhood,
      address.lat,
      address.lng,
      address.id_user,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error : ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva direccion : ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Address.update = (category, result) => {
  const sql = `
UPDATE categories SET name = ?, description = ?, image = ?, updated_at = ? WHERE id = ?`;

  db.query(
    sql,
    [
      category.name,
      category.description,
      category.image,
      new Date(),
      category.id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error : ", err);
        result(err, null);
      } else {
        console.log("Id de la categoria actualizada : ", category.id);
        result(null, category.id);
      }
    }
  );
};

Address.delete = (id, result) => {
  const sql = `
  DELETE FROM categories WHERE id = ?`;

  db.query(sql, id, (err, res) => {
    if (err) {
      console.log("Error : ", err);
      result(err, null);
    } else {
      console.log("Id de la categoria eliminada : ", id);
      result(null, id);
    }
  });
};

module.exports = Address;

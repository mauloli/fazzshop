const connection = require("../../config/mysql");

module.exports = {
  createStore: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO store SET ?",
        data,
        (err, res) => {
          if (!err) {
            const newResult = {
              id: res.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(err.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  updateStore: (id, data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "UPDATE store SET ? WHERE id = ?",
        [data, id],
        (err) => {
          if (!err) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(err.sqlMessage));
          }
        }
      );
      console.log(query.sql);
    }),
  getAllStore: () =>
    new Promise((resolve, reject) => {
      const query = connection.query("SELECT * FROM store", (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err.sqlMessage));
        }
      });
      console.log(query.sql);
    }),
};

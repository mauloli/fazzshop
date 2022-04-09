const connection = require("../../config/mysql");

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (err, res) => {
        if (!err) {
          const newResult = {
            id: res.id,
            ...data,
          };

          resolve(newResult);
        } else {
          console.log(err);
          reject(new Error(err.sqlMessage));
        }
      });
    }),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email = ?",
        email,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err.sqlMessage));
          }
        }
      );
    }),
};

const connection = require("../../config/mysql");

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.id,
            ...data,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          console.log(error);
          reject(new Error(error.sqlMessage));
        }
      });
    }),
};

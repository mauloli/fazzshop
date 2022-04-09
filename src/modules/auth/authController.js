const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");

module.exports = {
  register: async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const { firstName, lastName, noTelp, email, password } = req.body;
      const setData = {
        id: uuidv4(),
        firstName,
        lastName,
        noTelp,
        email,
        password,
      };
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 400, "email sudah terdaftar", null);
      }
      const result = await authModel.register(setData);

      return helperWrapper.response(res, 200, "succes register user", result);
    } catch (error) {
      console.log(error);
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.length < 1) {
        return helperWrapper.response(res, 404, "email not found", null);
      }
      const validPass = await bcrypt.compare(password, checkUser[0].password);
      if (!validPass) {
        return helperWrapper.response(res, 404, "password wrong", null);
      }
      return helperWrapper.response(res, 200, "succes login", null);
    } catch (error) {
      return helperWrapper.response(res, 400, "bad request", null);
    }
  },
};

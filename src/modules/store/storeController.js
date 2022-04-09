const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helper/wrapper");
const storeModel = require("./storeModel");

module.exports = {
  createStore: async (req, res) => {
    try {
      const { name, description, location } = req.body;
      let token = req.headers.authorization;
      if (!token) {
        return helperWrapper.response(res, 400, "you are not loggedin", null);
      }
      token = token.split(" ")[1];
      const user = jwt.verify(token, "RAHASIA", (error, result) => {
        if (error) {
          return helperWrapper.response(res, 400, error.message, null);
        }
        req.decodeToken = result;

        return result;
      });

      const setData = {
        name,
        description,
        location,
        userId: user.id,
      };
      await storeModel.createStore(setData);
      return helperWrapper.response(
        res,
        200,
        "Succes Create Your Store!!",
        setData
      );
    } catch (error) {
      return helperWrapper.response(res, 200, "Bad Request!", null);
    }
  },
  updateStore: async (req, res) => {
    try {
      const { name, description, location } = req.body;
      const { id } = req.params;

      const setData = {
        name,
        description,
        location,
        updatedAt: new Date(Date.now()),
      };
      const result = await storeModel.updateStore(id, setData);
      return helperWrapper.response(
        res,
        200,
        "Succes Update Your Store!!",
        result
      );
    } catch (error) {
      return helperWrapper.response(res, 200, "Bad Request!", null);
    }
  },
  getAllStore: async (req, res) => {
    try {
      const { description, location } = req.query;
      const { id } = req.params;

      const setData = {
        description,
        location,
        updatedAt: new Date(Date.now()),
      };
      const result = await storeModel.updateStore(id, setData);
      return helperWrapper.response(
        res,
        200,
        "Succes Update Your Store!!",
        result
      );
    } catch (error) {
      return helperWrapper.response(res, 200, "Bad Request!", null);
    }
  },
};

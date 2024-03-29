const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../services/validator");

module.exports = {
  // Create a new user at registration
  create: async (request, response, next) => {
    try {
      // Validate registration form data
      if (!validator.isName(request.body.firstName) || !validator.isName(request.body.lastName) || !validator.isEmail(request.body.email) || !validator.isPassword(request.body.password)) {
        return response.json({ status: "error", message: "Invalid input data", data: null });
      }

      const { firstName, lastName, email, password } = request.body;

      const result = await userModel.create({ firstName, lastName, email, password });

      if (result) {
        response.json({ status: "success", message: "User added successfully!", data: null });

        next();
      }
    } catch (error) {
      response.json({ status: "error", message: "Email already in use. Try a different email.", data: null });

      next();
    }
  },
  // Authenticate user at login
  authenticate: async (request, response, next) => {
    try {
      // Validate login form data and existing user
      const user = validator.isEmail(request.body.email) ? await userModel.findOne({ email: request.body.email }) : null;

      if (!user) {
        return response.json({ status: "error", message: "User does not exist. Please register to continue.", data: null });

        //next();
      }
      // Perform password decryption and check
      const isMatch = await bcrypt.compare(request.body.password, user.password);

      if (!isMatch) {
        return response.json({ status: "error", message: "Invalid password.", data: null });

        //next();
      }
      // Create token at successful authentication
      const token = jwt.sign({ id: user._id }, request.app.get("secretKey"), {
        expiresIn: "1h"
      });

      request.session.authUser = { userName: user.firstName + " " + user.lastName, userId: user._id, userEmail: user.email, token: token };

      response.json({
        status: "success",
        message: "Authentication successful!",
        data: { userName: user.firstName + " " + user.lastName, userId: user._id, userEmail: user.email, token: token }
      });

      next();
    } catch (error) {
      response.json({ status: "error", message: "Something went wrong: " + error, data: null });

      next();
    }
  }
};

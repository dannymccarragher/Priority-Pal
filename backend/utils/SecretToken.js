require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  if (!process.env.TOKEN_KEY) {
    throw new Error("TOKEN_KEY is not defined in the environment variables");
  }
  try {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
  } catch (error) {
    console.error("Error creating JWT:", error.message);
    throw error;
  }
};
module.exports.verifySecretToken = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_KEY);
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    return null;
  }
};

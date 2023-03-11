const jwt = require("jsonwebtoken");
const { secret } = require("../secret/secret");

exports.isAuth = async (req, res, next) => {
  const token = req.get("Authorization").split("=")[1];

  let decodeToken;
  try {
    decodeToken = jwt.verify(token, secret);
  } catch (err) {
    res.status(401).json({ message: "Not Authenticated" });
    err.statuscode = 500;
    throw err;
  }
  if (!decodeToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;

    throw error;
  }
  req.userId = decodeToken.userId;

  next();
};

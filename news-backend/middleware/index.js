const admin = require("../config/auth.config");

async function decodeToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if(token == null || token == undefined || token == "undefined") {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    console.log(token);
    const decodeValue = admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    } else {
      return res.status(401);
    }
  } catch (error) {
    return res.status(401);
  }
}

module.exports = decodeToken;
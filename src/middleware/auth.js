const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../error/commonErrors");

const isAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      req.user = user;
      return next();
    }
  }

  throw new UnauthorizedError("Unauthorized");
};


module.exports = isAuth;

const jwt = require("jsonwebtoken");

/**
 * @param {*} tokenType 토큰 유형
 */
const verifyToken = (tokenType) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")[1] //bearer가 있는 경우
      : null;

    if (!token) {
      return res.status(400).send({
        statusCode: 400,
        code: "BAD_REQUEST_TOKEN",
        message: "토큰이 없습니다.",
      });
    }

    jwt.verify(token, tokenType, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          statusCode: 401,
          code: "UNAUTHORIZED_TOKEN",
          message: "유효하지 않는 토큰입니다. " + err,
        });
      }
      req.userId = decoded.id;
      next();
    });
  };
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
module.exports = authJwt;

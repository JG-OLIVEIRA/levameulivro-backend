const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_KEY,
    function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .send({ messege: "Sessão expirada, por favor logue novamente" });
      }
      return decoded;
    }
  );
  req.headers.authorization = decoded;
  next();
};

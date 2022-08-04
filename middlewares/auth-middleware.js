const jwt = require("jsonwebtoken");
const {User} = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.1",
    });
    return;
  }

 try {
    const { userid } = jwt.verify(authToken, "customized-secret-key");
    User.findByPk(userid).then((user) => {
      res.locals.user = user.dataValues.userid; //userid만 넣게함.
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.2",
    });
  }
};
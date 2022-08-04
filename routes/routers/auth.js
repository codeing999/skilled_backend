const { Router } = require("express");

const loginController = require("../controllers/login.js");

const loginRouter = Router();

loginRouter.route('')
    .post(loginController.login);


module.exports = loginRouter;
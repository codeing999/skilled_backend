const Router = require("express");

const joinController = require("../controllers/join.js");

const joinRouter = Router();

joinRouter.route('')
    .post(joinController.join);


module.exports = joinRouter;
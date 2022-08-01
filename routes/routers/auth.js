import { Router } from "express";

import * as loginController from "../controllers/auth.js";

const loginRouter = Router();

loginRouter.route('')
    .post(loginController.login);


export default loginRouter;
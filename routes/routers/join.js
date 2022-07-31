import { Router } from "express";

import * as joinController from "../controllers/join.js";

const joinRouter = Router();

joinRouter.route('')
    .post(joinController.join);


export default joinRouter;
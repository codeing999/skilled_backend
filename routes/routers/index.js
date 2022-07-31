import express from "express";

import noteJoin from "./join.js";
import noteLogin from "./login.js";
import noteRouter from "./note.js";
import commentRouter from "./comment.js";

const router = express.Router();

router.use('/join', noteJoin);
router.use('/login', noteLogin);
router.use('/note', noteRouter);
router.use('/comment', commentRouter);

export default router;
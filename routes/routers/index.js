import express from "express";

import joinRouter from "./join.js";
import loginRouter from "./auth.js";
import noteRouter from "./note.js";
import commentRouter from "./comment.js";

const router = express.Router();

router.use('/join', joinRouter);
router.use('/login', loginRouter);
router.use('/note', noteRouter);
router.use('/comment', commentRouter);

export default router;
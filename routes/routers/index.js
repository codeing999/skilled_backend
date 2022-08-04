const express = require("express");

const joinRouter = require("./join.js");
const loginRouter = require("./auth.js");
const noteRouter = require("./note.js");
const commentRouter =  require("./comment.js");

const router = express.Router();

router.use('/join', joinRouter);
router.use('/login', loginRouter);
router.use('/note', noteRouter);
router.use('/comment', commentRouter);

module.exports = router;
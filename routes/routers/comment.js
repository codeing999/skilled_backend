const Router = require("express");

const authmiddleware = require("../../middlewares/auth-middleware.js");
const commentController = require("../controllers/comment.js");
const commentRouter = Router();

commentRouter.route('/:noteid')
    .get(commentController.getCommentByNoteId)
    .post(authmiddleware, commentController.postCommentByNoteId)
commentRouter.route('/:commentid')
    .put(authmiddleware, commentController.putCommentByCommentId)
    .delete(authmiddleware, commentController.deleteCommentByCommentId);

module.exports = commentRouter;
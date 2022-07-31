import { Router } from "express";

import * as commentController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.route('/:noteId')
    .get(commentController.getCommentByNoteId)
    .post(commentController.postCommentByNoteId)
    .put(commentController.putCommentByCommentId)
    .delete(commentController.deleteCommentByCommentId);
export default commentRouter;
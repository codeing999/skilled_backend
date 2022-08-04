const { Router } = require("express");

const authmiddleware = require("../../middlewares/auth-middleware.js");
const noteController = require("../controllers/note.js");
const noteRouter = Router();

noteRouter.route('')
    .get(noteController.getNote)
    .post(authmiddleware, noteController.postNote);
noteRouter.route('/like')   //이게 /:noteid들어간애들보다 밑이면 안됨. like를 :noteid 파람 입력한거로 인식함.
    .get(authmiddleware, noteController.getNoteByLike)
noteRouter.route('/:noteid')
    .get(noteController.getNoteByNoteId)
    .put(authmiddleware, noteController.putNoteByNoteId)
    .delete(authmiddleware, noteController.deleteNoteByNoteId);
noteRouter.route('/:noteid/like')
    .put(authmiddleware, noteController.putNoteLike)

module.exports = noteRouter;
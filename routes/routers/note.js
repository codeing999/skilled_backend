import { Router } from "express";

import * as noteController from "../controllers/note.js";

const noteRouter = Router();

noteRouter.route('')
    .get(noteController.getNote)
    .post(noteController.postNote);
noteRouter.route('/:noteId')
    .get(noteController.getNoteByNoteId)
    .put(noteController.putNoteByNoteId)
    .delete(noteController.deleteNoteByNoteId);

export default noteRouter;
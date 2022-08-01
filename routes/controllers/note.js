import Joi from "joi";

import * as utils from "../../modules/utils.js";


const postNote = async (req, res, next) => {
    console.log(req.body );
    try {

        const noteDto = await Joi.object({
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required()
        }).validateAsync({ ...req.body });

        //const note = await noteQuery.postNoteQuery(noteDto);
        return res.status(201).json(
            utils.createJson(true, 'Note is created', note));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

};

const getNote = async (req, res, next) => {

    try {

        return res.json("나중에 db연결하면 할거");

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByNoteId = async (req, res, next) => {
    const { noteId } = req.params;

    try {

        return res.json("나중에 db연결하면 할거");

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const putNoteByNoteId = async (req, res, next) => {
    const { noteId } = req.params;

    try {

        const noteDto = await Joi.object({
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required()
        }).validateAsync({ ...req.body });

        //const note = await noteQuery.postNoteQuery(noteDto);
        return res.status(201).json(
            utils.createJson(true, 'Note is created', note));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const deleteNoteByNoteId = async (req, res, next) => {
    const { noteId } = req.params;

    try {

        return res.json("나중에 db연결하면 할거");
        
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByLike = async (req, res, next) =>{
    
    return res.json("이건 아직 안함");

}

const putNoteLike = async (req, res, next) =>{
    
    return res.json("이건 아직 안함");

}

export {

    postNote,
    getNote,
    getNoteByNoteId,
    putNoteByNoteId,
    deleteNoteByNoteId,
    getNoteByLike,
    putNoteLike

}
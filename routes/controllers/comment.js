import Joi from "joi";

import * as utils from "../../modules/utils.js";


const postCommentByNoteId = async (req, res, next) => {

    try {

    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

};

const getCommentByNoteId  = async (req, res, next) => {
    return res.json("이건 아직 안함");
}

const putCommentByCommentId  = async (req, res, next) => {
    return res.json("이건 아직 안함");
}

const deleteCommentByCommentId = async (req, res, next) => {
    return res.json("이건 아직 안함");
}

export {

    postCommentByNoteId,
    getCommentByNoteId,
    putCommentByCommentId,
    deleteCommentByCommentId

}
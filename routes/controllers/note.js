const Sequelize = require("sequelize");
const { Op } = require('sequelize') //조건절에 and, or 연산자 사용하게.

const Joi = require("joi");


const utils = require("../../modules/utils.js");
const  {Note, Comment, Like}  = require("../../models");


const postNote = async (req, res, next) => {

    const userid = res.locals.user;

    try {
        const noteDto = await Joi.object({
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required(),
            userid : Joi.number().required()
        }).validateAsync({  ...req.body, userid}  );

        const note = await Note.create({
                fk_user_id : userid,
                title : noteDto.title,
                content : noteDto.content

            }
        )
        return res.status(201).json(
            utils.createJson(true, 'Note was created', note));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

};

const getNote = async (req, res, next) => {

    try {
        const note = await Note.findAll();
        return res.status(200).json(
            utils.createJson(true, 'Access to Note list was successful', note));

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByNoteId = async (req, res, next) => {
    
    try {
        const noteDto = await Joi.object({
            noteid : Joi.number().required(),
        }).validateAsync({ ...req.params });

        const note = await Note.findOne({
            where: {
                noteid : noteDto.noteid
            }
        });

        const commentDto = await Joi.object({ //글상세조회시 댓글까지.
            noteid : Joi.number().required(),
        }).validateAsync({ ...req.params });

        const comment = await Comment.findAll({
            order : [
                ['createdAt', 'desc']
            ],
            where: {
                fk_note_id : commentDto.noteid
            }
            
        });

        if(note)
            return res.status(200).json(
                utils.createJson(true, 'Access to Note was successful', { note : note.dataValues, comment : comment } ));
        else
            return res.status(404).json(utils.createJson(false, "존재하지 않는 글입니다.", {}));

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const putNoteByNoteId = async (req, res, next) => {

    const userid = res.locals.user;

    try {

        const noteDto = await Joi.object({
            noteid : Joi.number().required(),
            userid : Joi.number().required(),
            title : Joi.string().min(1).max(50).required(),
            content : Joi.string().min(1).max(255).required()
        }).validateAsync({ ...req.params, ...req.body, userid });

        const author = await Note.findByPk(req.params.noteid);

        if ( author === null){
            return res.status(404).json(utils.createJson(false, "존재하지 않는 댓글입니다.", {}));
        }

        if (userid !== author.dataValues.fk_user_id)
            return res.status(401).json(utils.createJson(false, "수정 권한이 없는 사용자입니다.", {}));

        const note = await Note.update({
            title : noteDto.title,
            content : noteDto.content

            }, {
            where : {
                noteid : noteDto.noteid
                }
            }
        )

        if(note[0]) //수정이 성공하면 1 실패하면 0
            return res.status(201).json(
                utils.createJson(true, 'Note was updated', note.dataValues));
        else
            return res.status(404).json(utils.createJson(false, "존재하지 않는 글입니다.", {}));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const deleteNoteByNoteId = async (req, res, next) => {

    const userid = res.locals.user;

    try {

        const noteDto = await Joi.object({
            noteid : Joi.number().required(),
            userid : Joi.number().required()
        }).validateAsync({ ...req.params, userid });

        const author = await Note.findByPk(req.params.noteid);
        
        if ( author === null){
            return res.status(404).json(utils.createJson(false, "존재하지 않는 댓글입니다.", {}));
        }

        if (userid !== author.dataValues.fk_user_id)
            return res.status(401).json(utils.createJson(false, "삭제 권한이 없는 사용자입니다.", {}));

        const note = await Note.destroy({
            where : {
                noteid : noteDto.noteid
                }
            }
        )
 
        if(note) //삭제가 성공하면 1 실패하면 0
            return res.status(201).json(
                utils.createJson(true, 'Note was deleted', note.dataValues));
        else
            return res.status(404).json(utils.createJson(false, "존재하지 않는 글입니다.", {}));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const getNoteByLike = async (req, res, next) =>{

    const userid = res.locals.user;

    try {
        const likeDto = await Joi.object({
            userid : Joi.number().required(),
        }).validateAsync({ userid });

        const LIKENOTES = await Like.findAll({  //좋아요 한게 없으면 []
            include : [{
                model:Note,
                attributes:['title', 'content', 'createdAt', 'updatedAt', 'like'],
            }],
            attributes:['fk_user_id', 'fk_note_id'],
            raw:true //raw값이 true이면 dataValues부분만 리턴.
        });        

        return res.status(200).json(
            utils.createJson(true, '좋아요한 게시물 조회에 성공하였습니다.', LIKENOTES));

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }    

}

const putNoteLike = async (req, res, next) =>{

    const userid = res.locals.user;

    try {

        const noteDto = await Joi.object({
            noteid : Joi.number().required(),
            userid : Joi.number().required(),
        }).validateAsync({ ...req.params, userid });

        const IS_EXIST = await Note.findByPk(noteDto.noteid);
        if ( IS_EXIST === null){
            return res.status(404).json(utils.createJson(false, "존재하지 않는 글입니다.", {}));
        }

        const IS_LIKE_CLICKED = await Like.findOne({
            where : {
                fk_note_id : noteDto.noteid,
                fk_user_id : noteDto.userid
            
            }
        });
        console.log(IS_LIKE_CLICKED, noteDto.noteid, noteDto.userid);
        if (IS_LIKE_CLICKED === null) {
            const likeclick = await Like.create({
                fk_note_id : noteDto.noteid,
                fk_user_id : noteDto.userid
            })
            const note = await Note.increment( { like : 1 }, { where : { noteid:noteDto.noteid}}   );
            return res.status(201).json(
                utils.createJson(true, 'Note was updated', {}));
            
        } else {
            const likeclick = await Like.destroy({
                where : {
                    fk_note_id : noteDto.noteid,
                    fk_user_id : noteDto.userid
                    }
                }
            )
            const note = await Note.increment( { like : -1 }, { where : { noteid:noteDto.noteid}}   );
            return res.status(201).json(
                utils.createJson(true, 'Note was updated', {}));
        }
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

module.exports = {

    postNote,
    getNote,
    getNoteByNoteId,
    putNoteByNoteId,
    deleteNoteByNoteId,
    getNoteByLike,
    putNoteLike

}
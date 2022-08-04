const Joi = require("joi");
const { Op } = require('sequelize') //조건절에 and, or 연산자 사용하게.

const utils = require("../../modules/utils.js");
const { Comment } = require("../../models");


const postCommentByNoteId = async (req, res, next) => {

    const userid = res.locals.user;

    try {

        const commentDto = await Joi.object({
            noteid : Joi.number().required(),
            userid : Joi.number().required(),
            content : Joi.string().min(1).max(255).required()
        }).validateAsync({ ...req.params, ...req.body, userid });

        const comment = await Comment.create({
                fk_note_id : commentDto.noteid,
                fk_user_id : commentDto.userid,
                content : commentDto.content

            }
        )
        return res.status(201).json(
            utils.createJson(true, 'Comment was created', comment));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

};

const getCommentByNoteId  = async (req, res, next) => {

    try {
        const commentDto = await Joi.object({
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

        if(comment.length) //comment는 없으면 []
            return res.status(200).json(
                utils.createJson(true, 'Access to Comment was successful', comment));
        else
            return res.status(404).json(utils.createJson(false, "해당 글에 댓글이 없습니다.", {}));

    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }
}

const putCommentByCommentId  = async (req, res, next) => {

    const userid = res.locals.user;

    try {

        const commentDto = await Joi.object({
            userid : Joi.number().required(),
            commentid : Joi.number().required(),
            content : Joi.string().min(1).max(255).required()
        }).validateAsync({ ...req.params, ...req.body, userid });

        const author = await Comment.findByPk(req.params.commentid);
        if ( author === null){
            return res.status(404).json(utils.createJson(false, "존재하지 않는 댓글입니다.", {}));
        }
        if (userid !== author.dataValues.fk_user_id)
            return res.status(401).json(utils.createJson(false, "수정 권한이 없는 사용자입니다.", {}));

        const comment = await Comment.update({
            content : commentDto.content

            }, {
            where : {
                commentid : commentDto.commentid
                }
            }
        )

        if(comment[0]) //수정이 성공하면 1 실패하면 0
            return res.status(201).json(
                utils.createJson(true, 'Comment was updated', comment.dataValues));
        else
            return res.status(404).json(utils.createJson(false, "존재하지 않는 댓글입니다.", {}));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }

}

const deleteCommentByCommentId = async (req, res, next) => {

    const userid = res.locals.user;

    try {

        const commentDto = await Joi.object({
            commentid : Joi.number().required(),
            userid : Joi.number().required()
        }).validateAsync({ ...req.params, userid });

        const author = await Comment.findByPk(req.params.commentid);
        if ( author === null){
            return res.status(404).json(utils.createJson(false, "존재하지 않는 댓글입니다.", {}));
        }
        if (userid !== author.dataValues.fk_user_id)
            return res.status(401).json(utils.createJson(false, "삭제 권한이 없는 사용자입니다.", {}));

        const comment = await Comment.destroy({
            where : {
                commentid : commentDto.commentid
                }
            }
        )
        console.log(comment)
        if(comment) //삭제가 성공하면 1 실패하면 0
            return res.status(201).json(
                utils.createJson(true, 'Comment was deleted', comment.dataValues));
        else
            return res.status(404).json(utils.createJson(false, "존재하지 않는 글입니다.", {}));
    
    } catch (err) {

        console.error(err);
        return res.json(err.message);

    }
}


module.exports = {
    postCommentByNoteId,
    getCommentByNoteId,
    putCommentByCommentId,
    deleteCommentByCommentId
};

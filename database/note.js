// const db = require("./index.js");
const { notedb } = require("../models");

const postNoteQuery = async (noteDto) => {
    const image = null;
    const userId = 2;
    const [sql] = await notedb.query(`
        INSERT INTO note
            (title, content, image, fk_user_id)
            VALUES
            ("${noteDto.title}", "${noteDto.content}", ${image}, "${userId}" );
    `);
    return sql;
}

const getNoteQuery = async () => {
    const [sql] = await notedb.query(`
        SELECT * FROM note
    `);
    return sql;
}

const getNoteByNoteIdQuery = async (note_id) => {
    const [sql] = await notedb.query(`
        SELECT * FROM note N
        WHERE N.note_id = ${note_id}
    `);
    return sql;
}

const putNoteByNoteIdQuery = async (note_id, title, content) => {
    const [sql] = await notedb.query(`
        
    `);
    return;
}

const deleteNoteByNoteIdQuery = async (note_id) => {
    const [sql] = await notedb.query(`
        DELETE FROM note N
        WHERE N.note_id = ${note_id}
    `);
    return sql;
}

const getNoteByLikeQuery = async (note_id) => {
    const [sql] = await notedb.query(`
        
    `);
    return;
}

const putNoteLikeQuery = async (note_id) => {
    const [sql] = await notedb.query(`
        
    `);
    return;
}

module.exports = {
    postNoteQuery,
    getNoteQuery,
    getNoteByNoteIdQuery,
    putNoteByNoteIdQuery,
    deleteNoteByNoteIdQuery,
    getNoteByLikeQuery,
    putNoteLikeQuery
}

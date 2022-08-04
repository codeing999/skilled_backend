//const  User  = require("../../models/user.js");
const { Op } = require('sequelize') //조건절에 and, or 연산자 사용하게.
const { User } = require("../../models");
const join = async (req, res) => {
    const { nickname, password, confirm } = req.body;

    if (password !== confirm) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    } 

    // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findAll({
        where: {
            nickname
        },
    });
    const test = await User.findAll();
    console.log('로그:' + test.length, test);
    if (existsUsers.length) {
        res.status(400).send({
            errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
        });
        return;
    }


    await User.create({ nickname, password });
    res.status(201).send({});

};

module.exports = { join };

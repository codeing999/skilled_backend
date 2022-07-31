//import User from "./models/user";
// 회원가입 API
const join = async (req, res) => {
    // const { email, nickname, password, confirmPassword } = req.body;
    // if (password !== confirmPassword) {
    //     res.status(400).send({
    //         errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    //     });
    //     return;
    // }
    // // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
    // const existsUsers = await User.findOne({
    //     $or: [{ email }, { nickname }],
    // });
    // if (existsUsers) {
    //     // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Che
    //     res.status(400).send({
    //         errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    //     });
    //     return;
    // }
    // const user = new User({ email, nickname, password });
    // await user.save();
    res.status(201).send({});
};

export {

    join

}
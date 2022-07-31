import jwt from "jsonwebtoken";
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.ht
    if (!user || password !== user.password) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        });
        return;
    }
    res.send({
        token: jwt.sign({ userId: user.userId }, "customized-secret-key"),
    });
};

export {

    login

}
import { smtpTransport } from '../utils/nodemailer/email.js';
import bcrypt from 'bcrypt';
export class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    // 이메일 인증보내기
    mailSend = async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(404).json({ errMessage: '이메일이 존재하지 않습니다.' });
            }

            const emailAuthInfo = await this.usersService.emailAuth(email);

            smtpTransport.sendMail(emailAuthInfo.mailOptions, (err, response) => {
                if (err) {
                    smtpTransport.close(); //전송종료
                    return res.status(550).json({ errorMessage: '메일 전송에 실패하였습니다.' });
                } else {
                    smtpTransport.close(); //전송종료
                }
            });

            res.cookie('authCode', emailAuthInfo.hashedCode, { maxAge: 3600000 });
            return res.status(200).json({ successMessage: '인증 메일이 발송되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    // 이메일 인증확인(추후 레디스로 업그레이드하기, 보안의 위험성이 큼;;)
    mailCheck = async (req, res, next) => {
        try {
            const { authCode } = req.body;

            if (!authCode) {
                return res.status(401).json({ errMessage: '인증 번호를 입력해주세요.' });
            }

            if (!(await bcrypt.compare(authCode, req.cookies.authCode))) {
                return res.status(401).json({ success: false, message: '인증번호가 일치하지 않습니다.' });
            }

            res.clearCookie('authCode');
            res.cookie('isEmailAuth', 'true');

            return res.status(200).json({ successMessage: '이메일 인증이 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    // 회원가입
    signUp = async (req, res, next) => {
        try {
            const { email, userName, password, passwordCheck, address, type } = req.body;

            if (req.cookies.isEmailAuth !== 'true') {
                return res.status(401).json({ errMessage: '이메일 인증이 되지 않았습니다. 이메인인증을 해주세요' });
            }

            if (!email || !userName || !password || !passwordCheck || !address || !type) {
                return res.status(404).json({
                    errMessage: '정보가 입력 되지 않았습니다. 정보를 입력해주세요.',
                });
            }

            if (password !== passwordCheck || password.length < 6) {
                return res.status(400).json({
                    errMessage: '비밀번호의 길이가 짧거나 두 비밀번호가 일치하지 않습니다.',
                });
            }

            if (!(type === 'GUEST' || type === 'OWNER')) {
                return res.status(400).json({
                    errMessage: '회원의 타입이 지정된것과 다릅니다. 다시입력해주세요',
                });
            }

            const User = await this.usersService.createUser(email, userName, password, address, type);
            res.clearCookie('isEmailAuth');
            return res.status(201).json({ successMessage: `${User.userName}님 가입이 완료되었습니다.` });
        } catch (err) {
            next(err);
        }
    };

    // 로그인
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ errMessage: '비밀번호와 이메일을 작성해주세요' });
            }

            const user = await this.usersService.signInUser(email, password);
            res.cookie('accessToken', user.accessToken);
            res.cookie('refreshToken', user.refreshToken);

            if (user.type === 'OWNER') {
                return res.status(201).json({
                    successMessage: `${user.userName} 사장님 로그인 성공!`,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                });
            } else if (user.type === 'GUEST') {
                return res.status(201).json({
                    successMessage: `${user.userName}님 로그인 성공!`,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                });
            }
        } catch (err) {
            next(err);
        }
    };

    // 로그아웃
    signOut = async (req, res, next) => {
        try {
            const { id } = req.user;

            await this.usersService.signOutUser(id);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).json({ successMessage: '로그아웃이 성공적으로 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    // 내정보 조회
    myInfo = async (req, res, next) => {
        try {
            const { id } = req.user;

            const user = await this.usersService.getUserById(id);

            return res.status(200).json({
                successMessage: '내 정보 조회가 완료되었습니다.',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };
}

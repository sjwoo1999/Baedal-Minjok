import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmailAlreadyExistsError, NotFoundError, InconsistencyError } from '../utils/err/err.js';

export class UsersServices {
    // 레포지토리 생성자
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    // 이메일 인증
    emailAuth = async (email) => {
        const authCode = Math.random().toString(36).substring(2, 8); // 무작위 인증코드 생성
        const hashedCode = await bcrypt.hash(authCode, 10); // 무작위 인증코드 해시하기

        const checkMail = (data) => {
            return `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>이메일 인증</title>
                  </head>
                  <body>
                      <div> 인증문자는 ${data} 입니다. </div>
                  </body>
                  </html>
                  `;
        };

        const mailOptions = {
            from: process.env.AUTHUSER, //발신자 이메일
            to: email, // 사용자가 입력한 이메일 == 인증할 이메일
            subject: '인증메일입니다.', // 메일제목
            html: checkMail(authCode), //표현할 html
        };

        return { mailOptions, hashedCode };
    };

    // 회원가입
    createUser = async (email, userName, password, address, type) => {
        const isExistUser = await this.usersRepository.findByEmail(email);

        if (isExistUser) {
            throw new EmailAlreadyExistsError('이미 등록된 이메일 주소입니다. 다른 이메일을 사용해주세요');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let point = 0;
        if (type === 'OWNER') {
            point = 0;
        } else if (type === 'GUEST') {
            point = 1000000;
        }

        const createdUser = await this.usersRepository.createUser(
            email,
            userName,
            hashedPassword,
            address,
            type,
            point
        );

        return {
            userName: createdUser.userName,
        };
    };

    // 로그인
    signInUser = async (email, password) => {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundError('존재하지 않는 이메일입니다.');
        } else if (!(await bcrypt.compare(password, user.password))) {
            throw new InconsistencyError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '12h' }
        );

        const refreshToken = jwt.sign(
            {
                email: user.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '168h' }
        );

        await this.usersRepository.updateToken(user.id, refreshToken);

        return {
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
            userName: user.userName,
            type: user.type,
        };
    };

    // 로그아웃
    signOutUser = async (id) => {
        await this.usersRepository.updateToken(id, null);
    };

    // 내정보 조회
    getUserById = async (id) => {
        const user = await this.usersRepository.findByIdWithPoint(id);

        return {
            userName: user.userName,
            userType: user.type,
            address: user.address,
            point: user.point[0].point,
        };
    };
}

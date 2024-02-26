import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmailAlreadyExistsError, NotFoundError, InconsistencyError } from '../utils/err/err.js';

export class UsersServices {
    // 레포지토리 생성자
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    // 회원가입
    createUser = async (email, userName, password, address, type) => {
        const isExistUser = await this.usersRepository.findByEmail(email);

        if (isExistUser) {
            throw new EmailAlreadyExistsError('이미 등록된 이메일 주소입니다. 다른 이메일을 사용해주세요');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await this.usersRepository.createUser(email, userName, hashedPassword, address, type);

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

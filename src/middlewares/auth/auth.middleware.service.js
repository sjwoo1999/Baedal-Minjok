import jwt from 'jsonwebtoken';
import { TokenError } from '../../utils/err/err.js';

export class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    checkAuth = async (accessToken, refreshToken) => {
        try {
            let resetAccess = accessToken;
            const refresh = await tokenCheck(refreshToken);

            const isExistToken = await this.usersRepository.findToken(refresh);

            // refreshToken은 있지만 accessToken은 없을 경우
            if (isExistToken && !accessToken) {
                const decodedToken = jwt.verify(refresh, process.env.JWT_SECRET_KEY);
                const email = decodedToken.email;
                const user = await this.usersRepository.findByEmail(email);
                accessToken = jwt.sign(
                    {
                        id: user.id,
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '12h' }
                );

                resetAccess = `Bearer ${accessToken}`;
            }

            const access = tokenCheck(resetAccess);
            const decodedToken = jwt.verify(access, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;

            const authUser = await this.usersRepository.findById(id);

            return { authUser, resetAccess };
        } catch (err) {
            next(err);
        }
    };
}

function tokenCheck(tokenKind) {
    const [tokenType, token] = tokenKind.split(' ');
    if (tokenType !== 'Bearer') throw new TokenError('토큰 타입이 일치하지 않습니다.');
    else return token;
}

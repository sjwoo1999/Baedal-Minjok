import { TokenError } from '../../utils/err/err.js';

export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    authMiddleWare = async (req, res, next) => {
        try {
            // req.cookies에서 토큰 받아오기
            let { accessToken, refreshToken } = req.cookies;

            // refreshToken없으면 에러던짐
            if (!refreshToken) {
                throw new TokenError('토큰이 존재하지 않습니다.');
            }

            // 서비스로 데이터 담아서 보내기
            const authUser = await this.authService.checkAuth(accessToken, refreshToken);

            // 인증유저 정보가 없으면 토큰지우고 에러반환.
            if (!authUser.authUser) {
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                throw new TokenError('토큰 사용자가 존재하지 않습니다.');
            }

            // 정보가 있으면 req.user에 담고 next진행
            // accessToken도 쿠키에 담아주기
            res.cookie('accessToken', authUser.resetAccess);
            req.user = authUser.authUser;

            next();
        } catch (err) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            next(err);
        }
    };
}

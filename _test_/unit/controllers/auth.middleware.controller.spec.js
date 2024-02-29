import { describe, expect, jest } from '@jest/globals';
import { AuthController } from '../../../src/middlewares/auth/auth.middleware.controller';
import { TokenError } from '../../../src/utils/err/err';

const mockAuthService = {
    checkAuth: jest.fn(),
};

const mockRequest = {
    cookies: jest.fn(),
    user: jest.fn(),
};

const mockResponse = {
    clearCookie: jest.fn(),
    cookie: jest.fn(),
};

const mockNext = jest.fn();

const authController = new AuthController(mockAuthService);

describe('인증 미들웨어 컨트롤러 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // 리프레시토큰과 액세스토큰이 전부 있을 경우
    it('리프레시토큰과 액세스토큰이 전부 있을 경우', async () => {
        const ReturnRequestCookieValue = {
            accessToken: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJpZCI6NS',
            refreshToken: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eadZsfNS',
        };
        mockRequest.cookies = ReturnRequestCookieValue;

        const ReturnCheckAuthValue = {
            authUser: {
                id: 1,
                email: 'hong@naver.com',
                password: '123456',
                userName: '홍길동',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            },
            resetAccess: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJp12s2NS',
        };

        mockAuthService.checkAuth.mockReturnValue(ReturnCheckAuthValue);

        await authController.authMiddleWare(mockRequest, mockResponse, mockNext);
        expect(mockAuthService.checkAuth).toHaveBeenCalledTimes(1);
        expect(mockAuthService.checkAuth).toHaveBeenCalledWith(
            ReturnRequestCookieValue.accessToken,
            ReturnRequestCookieValue.refreshToken
        );

        expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', ReturnCheckAuthValue.resetAccess);
        expect(mockRequest.user).toEqual(ReturnCheckAuthValue.authUser);
    });

    // 리프레시 토큰이 없을경우
    it('리프레시 토큰이 없을경우', async () => {
        const ReturnRequestCookieValue = {
            accessToken: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJpZCI6NS',
            refreshToken: null,
        };
        mockRequest.cookies = ReturnRequestCookieValue;

        await authController.authMiddleWare(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new TokenError('토큰이 존재하지 않습니다.'));
    });

    // 토큰의  유저 정보가 없을 경우
    it('토큰의  유저 정보가 없을 경우', async () => {
        const ReturnRequestCookieValue = {
            accessToken: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJpZCI6NS',
            refreshToken: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eadZsfNS',
        };
        mockRequest.cookies = ReturnRequestCookieValue;

        const ReturnCheckAuthValue = {
            authUser: null,
            resetAccess: 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJp12s2NS',
        };

        mockAuthService.checkAuth.mockReturnValue(ReturnCheckAuthValue);

        await authController.authMiddleWare(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new TokenError('토큰 사용자가 존재하지 않습니다.'));
    });
});

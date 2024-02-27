import { describe, expect, jest } from '@jest/globals';
import { AuthService } from '../../../src/middlewares/auth/auth.middleware.service';
import jwt from 'jsonwebtoken';
let mockUsersRepository = {
    findToken: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
};

let authService = new AuthService(mockUsersRepository);

describe('인증미들웨어 서비스 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('액세스 토큰과 리프레시 토큰이 둘다 있을 경우', async () => {
        const TokenValue = {
            accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCI6NS',
            refreshToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJlbWFpb',
        };

        const refresh = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJlbWFpb';

        const findTokenReturn = {
            id: 1,
            email: 'hong@naver.com',
            password: '123456',
            userName: '홍길동',
            address: '서울특별시 강남구 강남1동',
            type: 'GUEST',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJlbWFpb',
        };

        mockUsersRepository.findToken.mockReturnValue(findTokenReturn);
        jwt.verify = jest.fn().mockReturnValue({ id: 1 });
        mockUsersRepository.findById.mockReturnValue(findTokenReturn);

        const authInfo = await authService.checkAuth(TokenValue.accessToken, TokenValue.refreshToken);

        expect(mockUsersRepository.findToken).toHaveBeenCalledTimes(1);
        expect(mockUsersRepository.findToken).toHaveBeenCalledWith(refresh);
        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(mockUsersRepository.findById).toHaveBeenCalledTimes(1);
        expect(mockUsersRepository.findById).toHaveBeenCalledWith(1);
        expect(mockUsersRepository.findById).toHaveReturnedWith(findTokenReturn);

        expect(authInfo).toBeDefined();
    });

    it('토큰타입이 일치하지 않을 경우', async () => {
        const TokenValue = {
            accessToken: 'B1rer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCI6NS',
            refreshToken: 'Be2rer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJlbWFpb',
        };

        await expect(authService.checkAuth(TokenValue.accessToken, TokenValue.refreshToken)).rejects.toThrow();
    });
    it('리프레시 토큰은 있지만 액세스토큰이 없을경우', async () => {
        const TokenValue = {
            accessToken: '',
            refreshToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJlbWFpb',
        };
        const findTokenReturn = {
            id: 1,
            email: 'hong@naver.com',
            password: '123456',
            userName: '홍길동',
            address: '서울특별시 강남구 강남1동',
            type: 'GUEST',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJlbWFpb',
        };
        mockUsersRepository.findToken.mockReturnValue(findTokenReturn);
        mockUsersRepository.findByEmail.mockReturnValue(findTokenReturn);
        mockUsersRepository.findById.mockReturnValue(findTokenReturn);

        jwt.verify = jest.fn().mockReturnValueOnce({ email: 'hong@naver.com' }).mockReturnValueOnce({ id: 1 });
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCI6NS');

        const authInfo = await authService.checkAuth(TokenValue.accessToken, TokenValue.refreshToken);

        expect(jwt.verify).toHaveBeenCalledTimes(2);
        expect(mockUsersRepository.findById).toHaveBeenCalledTimes(1);
        expect(mockUsersRepository.findById).toHaveReturnedWith(findTokenReturn);

        expect(authInfo).toBeDefined();
    });
});

import { describe, expect, jest } from '@jest/globals';
import { UsersController } from '../../../src/controllers/users.controller';
import { smtpTransport } from '../../../src/utils/nodemailer/email';
import bcrypt from 'bcrypt';
const mockUsersService = {
    emailAuth: jest.fn(),
    createUser: jest.fn(),
    signInUser: jest.fn(),
    signOutUser: jest.fn(),
    getUserById: jest.fn(),
};

const mockRequest = {
    body: jest.fn(),
    user: jest.fn(),
    cookies: jest.fn(),
};

const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    cookie: jest.fn(),
    clearCookie: jest.fn(),
};

const mockNext = jest.fn();

const usersController = new UsersController(mockUsersService);

describe('유저 컨트롤러 유닛 테스트', () => {
    describe('이메일 인증 보내기 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            mockResponse.status.mockReturnValue(mockResponse);
        });

        // 인증 이메일 보내기 - 성공
        it('인증 이메일 보내기 - 성공', async () => {
            const requestBodyValue = {
                email: 'hong@naver.com',
            };

            mockRequest.body = requestBodyValue;

            const mailOptions = {
                from: 'sea@naver.com', //발신자 이메일
                to: requestBodyValue.email, // 사용자가 입력한 이메일 == 인증할 이메일
                subject: '인증메일입니다.', // 메일제목
                html: `<h1>테스트입니다</h1>`,
            };

            const emailAuthReturnValue = {
                mailOptions,
                hashedCode: 'hashedCode',
            };

            mockUsersService.emailAuth.mockReturnValue(emailAuthReturnValue);

            smtpTransport.sendMail = jest.fn().mockReturnValue('ok');

            const sendMailMock = jest.fn().mockImplementation((mailOptions, callback) => {
                callback(null, 'success');
            });
            smtpTransport.sendMail = sendMailMock;

            await usersController.mailSend(mockRequest, mockResponse, mockNext);

            smtpTransport.close = jest.fn();
            expect(sendMailMock).toHaveBeenCalled();
            expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        // 인증 이메일 보내기 - 이메일x
        it('인증 이메일 보내기 - 이메일x', async () => {
            const requestBodyValue = {
                email: null,
            };
            mockRequest.body = requestBodyValue;
            await usersController.mailSend(mockRequest, mockResponse, mockNext);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });

        // 인증 이메일 보내기 - 서버에러

        it('인증 이메일 보내기 - 서버에러', async () => {
            const requestBodyValue = {
                email: 'hong@naver.com',
            };

            mockRequest.body = requestBodyValue;

            const mailOptions = {
                from: 'sea@naver.com', //발신자 이메일
                to: requestBodyValue.email, // 사용자가 입력한 이메일 == 인증할 이메일
                subject: '인증메일입니다.', // 메일제목
                html: `<h1>테스트입니다</h1>`,
            };

            const emailAuthReturnValue = {
                mailOptions,
                hashedCode: 'hashedCode',
            };

            mockUsersService.emailAuth.mockReturnValue(emailAuthReturnValue);

            smtpTransport.sendMail = jest.fn().mockReturnValue('ok');
            let err = 'err!!!!!';
            const sendMailMock = jest.fn().mockImplementation((mailOptions, callback) => {
                callback(err, 'fail');
            });
            smtpTransport.sendMail = sendMailMock;

            await usersController.mailSend(mockRequest, mockResponse, mockNext);
            expect(sendMailMock).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(550);
        });
    });

    describe('이메일 인증 확인 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            mockResponse.status.mockReturnValue(mockResponse);
        });

        // 인증코드 인증 - 성공
        it('인증코드 인증 - 성공', async () => {
            const requestBodyValue = {
                authCode: '2q190s2xc',
            };
            const hashedAuthCode = await bcrypt.hash(requestBodyValue.authCode, 10);
            mockRequest.body = requestBodyValue;

            mockRequest.cookies = { authCode: hashedAuthCode };

            await usersController.mailCheck(mockRequest, mockResponse, mockNext);

            expect(mockResponse.clearCookie).toHaveBeenCalled();
            expect(mockResponse.clearCookie).toHaveBeenCalledWith('authCode');

            expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
            expect(mockResponse.cookie).toHaveBeenCalledWith('isEmailAuth', 'true');

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
        // 인증코드 없음 - 실패
        it('인증코드 없음 - 실패', async () => {
            const requestBodyValue = {
                authCode: null,
            };

            mockRequest.body = requestBodyValue;

            await usersController.mailCheck(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(401);
        });

        // 인증코드 불일치 - 실패
        it('인증코드 불일치 - 실패', async () => {
            const requestBodyValue = {
                authCode: '2q190s2xc',
            };
            const hashedAuthCode = await bcrypt.hash(requestBodyValue.authCode, 10);
            mockRequest.body = requestBodyValue;
            mockRequest.cookies = { authCode: hashedAuthCode };

            requestBodyValue.authCode = '1234';
            await usersController.mailCheck(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(401);
        });
    });

    describe('회원가입 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            mockResponse.status.mockReturnValue(mockResponse);
        });

        it('회원가입 - 성공', async () => {
            mockRequest.body = {
                email: 'hong@naver.com',
                userName: '홍길동',
                password: '123456',
                passwordCheck: '123456',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            };
            const createdUser = {
                userName: '홍길동',
            };

            mockUsersService.createUser.mockReturnValue(createdUser);
            mockRequest.cookies = { isEmailAuth: 'true' };
            await usersController.signUp(mockRequest, mockResponse, mockNext);

            expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
            expect(mockUsersService.createUser).toHaveBeenCalledWith(
                'hong@naver.com',
                '홍길동',
                '123456',
                '서울특별시 강남구 강남1동',
                'GUEST'
            );

            expect(mockUsersService.createUser).toHaveReturnedWith(createdUser);
            expect(mockResponse.clearCookie).toHaveBeenCalled();

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
        });

        // 회원가입 이메일 미인증 - 실패
        it('회원가입 이메일 미인증 - 실패', async () => {
            mockRequest.body = {
                email: 'hong@naver.com',
                userName: '홍길동',
                password: '123456',
                passwordCheck: '123456',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            };
            mockRequest.cookies = { isEmailAuth: 'false' };
            await usersController.signUp(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(401);
        });
        // 회원가입 필수항목 누락 - 실패
        it('회원가입 필수항목 누락 - 실패', async () => {
            mockRequest.body = {
                email: 'hong@naver.com',
                userName: null,
                password: '123456',
                passwordCheck: '123456',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            };

            mockRequest.cookies = { isEmailAuth: 'true' };
            await usersController.signUp(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
        // 회원가입 비밀번호 조건 불일치 - 실패
        it('회원가입 비밀번호 조건 불일치 - 실패', async () => {
            mockRequest.body = {
                email: 'hong@naver.com',
                userName: '홍길동',
                password: '123456',
                passwordCheck: '989898989',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            };

            mockRequest.cookies = { isEmailAuth: 'true' };
            await usersController.signUp(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        // 회원가입 타입 불일치 - 실패
        it('회원가입 타입 불일치 - 실패', async () => {
            mockRequest.body = {
                email: 'hong@naver.com',
                userName: '홍길동',
                password: '123456',
                passwordCheck: '123456',
                address: '서울특별시 강남구 강남1동',
                type: '손님',
            };

            mockRequest.cookies = { isEmailAuth: 'true' };
            await usersController.signUp(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });

    // describe('로그인 테스트', ()=>{
    //     beforeEach(() => {
    //         jest.resetAllMocks();
    //         mockResponse.status.mockReturnValue(mockResponse);
    //     });
    // })

    // describe('로그아웃 테스트', ()=>{
    //     beforeEach(() => {
    //         jest.resetAllMocks();
    //         mockResponse.status.mockReturnValue(mockResponse);
    //     });
    // })

    // describe('내 정보 조회 테스트', ()=>{
    //     beforeEach(() => {
    //         jest.resetAllMocks();
    //         mockResponse.status.mockReturnValue(mockResponse);
    //     });
    // })
});

import { describe, expect, jest } from '@jest/globals';
import { UsersController } from '../../../src/controllers/users.controller';
import { smtpTransport } from '../../../src/utils/nodemailer/email';

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
    clearCookie: jest.fn(),
};

const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    cookie: jest.fn(),
};

const mockNext = jest.fn();

const usersController = new UsersController(mockUsersService);

describe('유저 컨트롤러 유닛 테스트', () => {
    describe('인증 이메일 보내기', () => {
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

            const sendMailMock = jest.fn().mockImplementation((mailOptions, callback) => {
                callback(throw new error('에러'));
            });
            smtpTransport.sendMail = sendMailMock;

            await usersController.mailSend(mockRequest, mockResponse, mockNext);
        });
    });
});

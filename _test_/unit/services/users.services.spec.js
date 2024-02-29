import { describe, expect, jest } from '@jest/globals';
import { UsersServices } from '../../../src/services/users.services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let mockUsersRepository = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
    updateToken: jest.fn(),
    findByIdWithPoint: jest.fn(),
};

const usersServices = new UsersServices(mockUsersRepository);

describe('유저 서비스 유닛 테스트', () => {
    describe('이메인 인증전송 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        // 이메일 인증설정- 성공
        it('이메일 인증설정 - 성공', async () => {
            const email = 'test@example.com';
            const { mailOptions, hashedCode } = await usersServices.emailAuth(email);

            expect(mailOptions).toBeDefined();
            expect(mailOptions.from).toEqual(process.env.AUTHUSER);
            expect(mailOptions.to).toEqual(email);
            expect(mailOptions.subject).toEqual('인증메일입니다.');
            expect(mailOptions.html).toContain('인증문자는');
            expect(hashedCode).toBeDefined();
        });
    });

    describe('회원가입 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        // 회원가입 - 성공
        it('회원가입 - 성공', async () => {
            const createUserArgument = {
                email: 'sea@gmail.com',
                userName: '세종대왕',
                password: '123456',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            };

            const createUserReturnValue = {
                id: 1,
                email: 'sea@gmail.com',
                userName: '세종대왕',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
            };

            mockUsersRepository.findByEmail.mockReturnValue(null);

            mockUsersRepository.createUser.mockReturnValue(createUserReturnValue);

            const user = await usersServices.createUser(
                createUserArgument.email,
                createUserArgument.userName,
                createUserArgument.password,
                createUserArgument.address,
                createUserArgument.type
            );

            expect(mockUsersRepository.findByEmail).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(createUserArgument.email);

            expect(mockUsersRepository.createUser).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.createUser).toHaveBeenCalled();

            expect(user).toEqual({ userName: createUserReturnValue.userName });
        });

        // 회원가입(이미 존재하는 이메일) - 실패
        it('회원가입(이미 존재하는 이메일) - 실패', async () => {
            const createUserArgument = {
                email: 'sea@gmail.com',
                userName: '세종대왕',
                password: '123456',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
            };

            const findByEmailReturnValue = {
                id: 1,
                email: 'sea@gmail.com',
                userName: '세종대왕',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
            };

            mockUsersRepository.findByEmail.mockReturnValue(findByEmailReturnValue);

            await expect(
                usersServices.createUser(
                    createUserArgument.email,
                    createUserArgument.userName,
                    createUserArgument.password,
                    createUserArgument.address,
                    createUserArgument.type
                )
            ).rejects.toThrow();

            expect(mockUsersRepository.findByEmail).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(createUserArgument.email);
        });
    });

    describe('로그인 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        // 로그인 - 성공
        it('로그인 - 성공', async () => {
            const hashedPassword = await bcrypt.hash('123456', 10);
            const signInUserArgument = {
                email: 'hong@naver.com',
                password: '123456',
            };

            const findByEmailReturnValue = {
                id: 1,
                email: 'hong@gmail.com',
                password: hashedPassword,
                userName: '홍길동',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
            };

            mockUsersRepository.findByEmail.mockReturnValue(findByEmailReturnValue);

            jwt.sign = jest
                .fn()
                .mockReturnValueOnce('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCI6NS')
                .mockReturnValueOnce('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCIaaa');

            const user = await usersServices.signInUser(signInUserArgument.email, signInUserArgument.password);

            expect(mockUsersRepository.updateToken).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.updateToken).toHaveBeenCalledWith(
                findByEmailReturnValue.id,
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCIaaa'
            );

            expect(user).toMatchObject({
                accessToken: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCI6NS`,
                refreshToken: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJpZCIaaa`,
                userName: findByEmailReturnValue.userName,
                type: findByEmailReturnValue.type,
            });
        });

        // 로그인(이메일 미등록) - 실패
        it('로그인(이메일 미등록) - 실패', async () => {
            const signInUserArgument = {
                email: 'hong@naver.com',
                password: '123456',
            };

            const findByEmailReturnValue = null;
            mockUsersRepository.findByEmail.mockReturnValue(findByEmailReturnValue);

            await expect(
                usersServices.signInUser(signInUserArgument.email, signInUserArgument.password)
            ).rejects.toThrow();
        });

        // 로그인(비밀번호 불일치) - 실패
        it('로그인(비밀번호 불일치) - 실패', async () => {
            const hashedPassword = await bcrypt.hash('123456', 10);
            const signInUserArgument = {
                email: 'hong@naver.com',
                password: '123451',
            };

            const findByEmailReturnValue = {
                id: 1,
                email: 'hong@gmail.com',
                password: hashedPassword,
                userName: '홍길동',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
            };

            mockUsersRepository.findByEmail.mockReturnValue(findByEmailReturnValue);

            await expect(
                usersServices.signInUser(signInUserArgument.email, signInUserArgument.password)
            ).rejects.toThrow();
        });
    });

    describe('로그아웃 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        // 로그아웃 - 성공
        it('로그아웃 - 성공', async () => {
            const signOutUserArgument = {
                id: 1,
            };

            await usersServices.signOutUser(signOutUserArgument.id);

            expect(mockUsersRepository.updateToken).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.updateToken).toHaveBeenCalledWith(signOutUserArgument.id, null);
        });
    });

    describe('내정보 조회 테스트', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        // 내정보 조회 - 성공
        it('내정보 조회 - 성공', async () => {
            const getUserByIdArgument = {
                id: 1,
            };

            const findByIdWithPointValue = {
                userName: '이순신',
                userType: 'OWNER',
                address: '서울특별시 강남구 강남1동',
                point: [{ point: 1000000 }],
            };

            mockUsersRepository.findByIdWithPoint.mockReturnValue(findByIdWithPointValue);

            const user = await usersServices.getUserById(getUserByIdArgument.id);

            expect(mockUsersRepository.findByIdWithPoint).toHaveBeenCalledTimes(1);
            expect(mockUsersRepository.findByIdWithPoint).toHaveBeenCalledWith(getUserByIdArgument.id);
            expect(mockUsersRepository.findByIdWithPoint).toHaveReturnedWith(findByIdWithPointValue);

            expect(user).toBeDefined();
        });

        // 내정보 조회 - 실패
        it('내정보 조회 - 실패', async () => {
            const getUserByIdArgument = {
                id: 1,
            };

            const findByIdWithPointValue = null;

            mockUsersRepository.findByIdWithPoint.mockReturnValue(findByIdWithPointValue);

            await expect(usersServices.getUserById(getUserByIdArgument.id)).rejects.toThrow();
        });
    });
});

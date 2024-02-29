import { describe, expect, jest } from '@jest/globals';
import { UsersRepositories } from '../../../src/repositories/users.repositories';

let mockPrisma = {
    users: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    },
    points: {
        create: jest.fn(),
    },
};

let usersRepositories = new UsersRepositories(mockPrisma);

describe('유저 레포지토리 유닛 테스트', () => {
    describe('이메일을 이용하여 유저 찾기', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        it('findByEmail 테스트', async () => {
            const findByEmailArgument = {
                email: 'hong@naver.com',
            };

            const returnFindFirstValue = {
                id: 1,
                email: 'sea@gmail.com',
                userName: '세종대왕',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
            };

            mockPrisma.users.findFirst.mockReturnValue(returnFindFirstValue);

            const user = await usersRepositories.findByEmail(findByEmailArgument.email);

            expect(mockPrisma.users.findFirst).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('userName');
            expect(user).toBeDefined();
        });
    });

    // 트랜잭션 테스트 다시 해보기.. 테스트 미완
    describe('createUser, 데이터를 가져와 유저 생성하기', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        it('createUser 테스트', async () => {
            const createUserArgument = {
                email: 'hong@gmail.com',
                userName: '홍길동',
                hashedPassword: '123456',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                point: 1000000,
            };

            const mockCreatedUser = {
                id: 1,
                email: createUserArgument.email,
                userName: createUserArgument.userName,
                address: createUserArgument.address,
                type: createUserArgument.type,
            };

            mockPrisma.users.create.mockResolvedValueOnce(mockCreatedUser);
            mockPrisma.points.create.mockResolvedValueOnce({});

            mockPrisma.$transaction = jest.fn().mockReturnValue(createUserArgument);

            const user = await usersRepositories.createUser(
                createUserArgument.email,
                createUserArgument.userName,
                createUserArgument.hashedPassword,
                createUserArgument.address,
                createUserArgument.type,
                createUserArgument.point
            );

            expect(user).toBeDefined();
        });
    });

    describe('updateToken, 토큰을 업데이트하기', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        it('updateToken 테스트', async () => {
            const updateTokenArgument = {
                id: 1,
                token: 'dfafwf23rdfadasd31',
            };

            const user = await usersRepositories.updateToken(updateTokenArgument.id, updateTokenArgument.token);

            expect(mockPrisma.users.update).toHaveBeenCalledTimes(1);
            expect(user).not.toBeDefined();
        });
    });

    describe('findToken, 토큰을 이용하여 유저 찾기', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        it('findToken 테스트', async () => {
            const findTokenArgument = {
                token: 'dfafwf23rdfadasd31',
            };

            const returnFindFirstValue = {
                id: 1,
                email: 'sea@gmail.com',
                userName: '세종대왕',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'dfafwf23rdfadasd31',
            };

            mockPrisma.users.findFirst.mockReturnValue(returnFindFirstValue);

            const user = await usersRepositories.findToken(findTokenArgument.token);

            expect(mockPrisma.users.findFirst).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('userName');
            expect(user).toBeDefined();
        });
    });

    describe('findById, id를 이용하여 유저 찾기', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        it('findById 테스트', async () => {
            const findByIdArgument = {
                id: 1,
            };

            const returnFindFirstValue = {
                id: 1,
                email: 'sea@gmail.com',
                userName: '세종대왕',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
            };

            mockPrisma.users.findFirst.mockReturnValue(returnFindFirstValue);

            const user = await usersRepositories.findById(findByIdArgument.id);

            expect(mockPrisma.users.findFirst).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('userName');
            expect(user).toBeDefined();
        });
    });

    describe('findByIdWithPoint, id와 point를 통해 유저 찾기', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        it('findByIdWithPoint 테스트', async () => {
            const findByIdWithPointArgument = {
                id: 1,
            };

            const returnFindFirstValue = {
                id: 1,
                email: 'sea@gmail.com',
                userName: '세종대왕',
                address: '서울특별시 강남구 강남1동',
                type: 'GUEST',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXJ9.eyJlbWFpbCI6In',
                point: [{ point: 1000000 }],
            };

            mockPrisma.users.findFirst.mockReturnValue(returnFindFirstValue);

            const user = await usersRepositories.findByIdWithPoint(findByIdWithPointArgument.id);

            expect(mockPrisma.users.findFirst).toHaveBeenCalledTimes(1);
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('userName');
            expect(user).toBeDefined();
        });
    });
});

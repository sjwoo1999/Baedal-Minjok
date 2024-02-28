export class UsersRepositories {
    // 프리즈마 생성자 생성
    constructor(prisma) {
        this.prisma = prisma;
    }

    findByEmail = async (email) => {
        const findUser = await this.prisma.users.findFirst({
            where: {
                email: email,
            },
        });

        return findUser;
    };

    createUser = async (email, userName, hashedPassword, address, type, point) => {
        const createdUser = await this.prisma.$transaction(async (tx) => {
            const createdUser = await tx.users.create({
                data: {
                    email,
                    userName,
                    password: hashedPassword,
                    address,
                    type,
                },
            });

            await tx.points.create({
                data: {
                    userId: createdUser.id,
                    point: point,
                },
            });

            return createdUser;
        });

        return createdUser;
    };

    updateToken = async (id, token) => {
        await this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                token,
            },
        });
    };

    findToken = async (token) => {
        const refreshToken = await this.prisma.users.findFirst({
            where: {
                token,
            },
        });
        return refreshToken;
    };

    findById = async (id) => {
        const user = await this.prisma.users.findFirst({
            where: {
                id: +id,
            },
        });

        return user;
    };

    findByIdWithPoint = async (id) => {
        const user = await this.prisma.users.findFirst({
            where: {
                id: +id,
            },
            select: {
                id: true,
                email: true,
                userName: true,
                password: true,
                address: true,
                type: true,
                token: true,
                point: {
                    where: {
                        userId: +id,
                    },
                },
            },
        });
        return user;
    };

    // comparePassword = async (id, password) => {
    //     const writtenPassword = password;
    //     const originPassword = await this.prisma.Users.findFirst({
    //         where: {
    //             id: +id,
    //         },
    //         select: {
    //             password: true,
    //         },
    //     });
    //     const comparison = await bcrypt.compare(writtenPassword.password, originPassword.password);

    //     return comparison;
    // };
}

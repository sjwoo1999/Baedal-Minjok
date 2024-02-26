import bcrypt from 'bcrypt';

export class MenusRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    createMenu = async (restaurantId, name, menuInfo, price, image) => {
        const menu = await this.prisma.menus.create({
            data: {
                restaurantId: +restaurantId,
                name,
                menuInfo,
                price: +price,
                image
            }
        });
        return menu;
    }

    compareUserAndRestaurant = async (userId, restaurantId) => {
        const user = await this.prisma.Restaurants.findFirst({
            where: {
                userId: +userId
            },
            select: {
                id: true,
            }
        })
        const restaurant = await this.prisma.Menus.findFirst({
            where: {
                restaurantId: +restaurantId
            },
            select: {
                restaurantId: true
            }
        })

        if (user.id === restaurant) {
            return true;
        } else {
            return false;
        }
    }

    findMenuByRestaurantId = async (restaurantId) => {
        const menu = await this.prisma.Menus.findFirst({
            where: {
                restaurantId: +restaurantId
            },
            select: {
                restaurantId: true,
                name: true,
                menuInfo: true,
                price: true,
                image: true
            }
        })

        return menu;
    }

    findMenusByRestaurantId = async (restaurantId) => {
        const menus = await this.prisma.Menus.findMany({
            where: {
                restaurantId: +restaurantId
            },
            select: {
                restaurantId: true,
                name: true,
                price: true,
                image: true
            }
        })

        return menus;
    }

    findMenuById = async (menuId) => {
        const menu = await this.prisma.Menus.findFirst({
            where: {
                id: +menuId
            },
            select: {
                restaurantId: true,
                name: true,
                menuInfo: true,
                price: true,
                image: true
            }
        })
        return menu;
    }

    findPassword = async (id, password) => {
        const writtenPassword = password;
        const originPassword = await this.prisma.Users.findFirst({
            where: {
                id: +id
            },
            select: {
                password: true
            }
        })
        const comparison = await bcrypt.compare(writtenPassword, originPassword);

        return comparison;
    }

    updateMenu = async (restaurantId, menuId, updatedata) => {
        const updatedMenu = await this.prisma.Menus.update({
            where: {
                id: +menuId,
                restaurantId: +restaurantId
            },
            data: {
                ...updatedata
            }
        });

        return updatedMenu;
    }

    deleteMenu = async (restaurantId, menuId) => {
        const deletedMenu = await this.prisma.Menus.delete({
            where: {
                id: +menuId,
                restaurantId: +restaurantId
            }
        })

        return deletedMenu;
    }
}
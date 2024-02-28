export class MenusRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    createMenu = async (restaurantId, name, menuInfo, price, image) => {
        const menu = await this.prisma.Menus.create({
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

    updateMenu = async (restaurantId, menuId, name, price, menuInfo) => {
        console.log(restaurantId, menuId, name, price, menuInfo);
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

        console.log(menus);

        const updatedMenu = await this.prisma.Menus.update({
            where: {
                id: +menuId,
                restaurantId: +restaurantId
            },
            data: {
                name, price, menuInfo
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
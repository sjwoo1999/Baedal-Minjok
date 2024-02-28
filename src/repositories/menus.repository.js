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
                image,
            },
        });
        return menu;
    };

    // 상세메뉴를 하기 위해선 메뉴 아이디 필요함.
    findMenuByRestaurantId = async (restaurantId) => {
        const menu = await this.prisma.Menus.findFirst({
            where: {
                restaurantId: +restaurantId,
            },
            select: {
                restaurantId: true,
                name: true,
                menuInfo: true,
                price: true,
                image: true,
            },
        });

        return menu;
    };

    findMenusByRestaurantId = async (restaurantId) => {
        const menus = await this.prisma.Menus.findMany({
            where: {
                restaurantId: +restaurantId,
            },
            select: {
                restaurantId: true,
                name: true,
                price: true,
                image: true,
            },
        });

        return menus;
    };

    findMenuById = async (menuId) => {
        const menu = await this.prisma.Menus.findFirst({
            where: {
                id: +menuId,
            },
            select: {
                restaurantId: true,
                name: true,
                menuInfo: true,
                price: true,
                image: true,
            },
        });
        return menu;
    };

    updateMenu = async (restaurantId, menuId, updatedData) => {
        const updatedMenu = await this.prisma.Menus.update({
            where: {
                id: +menuId,
                restaurantId: +restaurantId,
            },
            data: {
                ...updatedData,
            },
        });

        return updatedMenu;
    };

    deleteMenu = async (restaurantId, menuId) => {
        const deletedMenu = await this.prisma.Menus.delete({
            where: {
                id: +menuId,
                restaurantId: +restaurantId,
            },
        });

        return deletedMenu;
    };
}

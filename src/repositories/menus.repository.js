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

    findMenuByName = async(name)=>{
        const menu = await this.prisma.Menus.findFirst({
            where:{
                name: name
            }
        })
        return menu;
    }

    findMenusByRestaurantId = async (restaurantId) => {
        const menus = await this.prisma.Menus.findMany({
            where: {
                restaurantId: +restaurantId,
            },
            select: {
                id: true,
                restaurantId: true,
                name: true,
                price: true,
                image: true,
            },
        });

        return menus;
    };

    findMenuByIds = async (restaurantId, menuId) => {
        const menu = await this.prisma.Menus.findFirst({
            where: {
                id: +menuId,
                restaurantId: +restaurantId
            },
            select: {
                id: true,
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

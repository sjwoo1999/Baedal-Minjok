export class RestaurantRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.prisma.Restaurants.findFirst({
            where: { id: +id },
            select: {
                name: true,
                callNumber: true,
                kind: true,
                restaurantInfo: true,
            },
        });
        return restaurant;
    };

    getRestaurantsByKind = async (kind) => {
        const restaurants = await this.prisma.Restaurants.findMany({
            where: {
                kind: kind,
            },
            select: {
                name: true,
                kind: true,
                callNumber: true,
                restaurantInfo: true,
            },
        });
        return restaurants;
    };

    getRestaurantsBySearch = async (value) => {
        const findMenus = await this.prisma.Menus.findMany({
            where: {
                OR: [{ name: { contains: value } }, { menuInfo: { contains: value } }],
            },
            select: {
                restaurantId: true,
            },
        });

        const restaurantIds = findMenus.map((menu) => menu.restaurantId);

        const findRestaurants = await this.prisma.Restaurants.findMany({
            where: {
                OR: [
                    { id: { in: restaurantIds } },
                    { name: { contains: value } },
                    { restaurantInfo: { contains: value } },
                ],
            },
            select: {
                name: true,
                kind: true,
                callNumber: true,
                restaurantInfo: true,
            },
        });
        return findRestaurants;
    };

    getRestaurants = async () => {
        const restaurants = await this.prisma.Restaurants.findMany({
            select: {
                name: true,
                kind: true,
                callNumber: true,
                restaurantInfo: true,
            },
            take: 20,
        });
        return restaurants;
    };

    findRestaurantByUserId = async (ownerId) => {
        const restaurant = await this.prisma.Restaurants.findFirst({
            where: {
                userId: +ownerId,
            },
            select: {
                id: true,
            },
        });
        return restaurant;
    };
}

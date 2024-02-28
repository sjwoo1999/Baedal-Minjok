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

    getRestaurantBySearch = async (value) => {
        const restaurants = await this.prisma.Restaurants.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: value,
                        },
                    },
                    {
                        menu: {
                            some: {
                                OR: [
                                    {
                                        name: {
                                            contains: value,
                                        },
                                    },
                                    {
                                        menuInfo: {
                                            contains: value,
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
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

    getRestaurants = async () => {
        const restaurants = await this.prisma.Restaurants.findMany({
            select: {
                name: true,
                kind: true,
                callNumber: true,
                restaurantInfo: true,
            }
        });
        return restaurants;
    }

    compareUserAndRestaurant = async (ownerId) => {
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

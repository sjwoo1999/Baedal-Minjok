export class OwnerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    createRestaurant = async (id, name, callNumber, kind, restaurantInfo, sales, orderCount) => {
        const restaurant = await this.prisma.Restaurants.create({
            data: {
                userId: id,
                name,
                callNumber,
                kind,
                restaurantInfo,
                sales: BigInt(sales),
                orderCount,
            },
        });
        return restaurant;
    };

    updateRestaurant = async (restaurantId, updateData) => {
        const updateRestaurant = await this.prisma.Restaurants.update({
            where: { id: +restaurantId },

            data: {
                ...updateData,
            },
        });
        return updateRestaurant;
    };

    deleteRestaurant = async (restaurantId) => {
        const deleteRestaurant = await this.prisma.Restaurants.delete({
            where: { id: +restaurantId },
        });

        return deleteRestaurant;
    };

    findRestaurantById = async (restaurantId) => {
        const restaurant = await this.prisma.Restaurants.findFirst({
            where: { id: +restaurantId },
            select: { id: true },
        });

        return restaurant;
    };
}

export class OwnerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    isOwner = async (ownerId) => {
        const isOwner = await this.prisma.Users.findFirst({
            where: { id: +ownerId },
            select: { type: true },
        });

        return isOwner.type === 'OWNER';
    };

    createRestaurant = async (id, name, callNumber, kind, restaurantInfo, sales, orderCount, rate) => {
        const restaurant = await this.prisma.Restaurants.create({
            data: {
                userId: id,
                name,
                callNumber,
                kind,
                restaurantInfo,
                sales: BigInt(sales),
                orderCount,
                rate: parseFloat(rate),
            },
        });
        return restaurant;
    };

    updateRestaurant = async (restaurantId, updateData) => {
        const updateRestaurant = await this.prisma.Restaurants.update({
            where: { id: +restaurantId },
            data: {
                ...updateData
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

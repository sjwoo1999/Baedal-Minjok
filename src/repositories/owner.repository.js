export class OwnerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    isOwner = async (ownerId) => {
        const isOwner = await this.prisma.Users.findFirst({
            where: {id: +ownerId},
            select: {type: true},
        })

        return (isOwner.type === "OWNER")
    }

    createRestaurant = async (name, callNumber, kind, restaurantInfo) => {
        const restaurant = await this.prisma.Restaurants.create({data: {
            name, callNumber, kind, restaurantInfo
        }})
        return restaurant;
    }

    updateRestaurant = async (restaurantId, name, callNumber, kind, restaurantInfo) => {
        const updateRestaurant = await this.prisma.Restaurants.update({
            where: {id: +restaurantId},
            data: {name, callNumber, kind, restaurantInfo},
        })

        return updateRestaurant;
    }

    deleteRestaurant = async (restaurantId) => {
        const deleteRestaurant = await this.prisma.Restaurants.delete({
            where: {id: +restaurantId},
        });

        return deleteRestaurant;
    }

    findRestaurantById = async (restaurantId) => {
        const restaurant = await this.prisma.Restaurants.findFirst({
            where: {id: +restaurantId},
            select: {id: true},
        })

        return restaurant;
    }
}
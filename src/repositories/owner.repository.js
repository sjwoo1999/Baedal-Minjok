export default class OwnerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    isOwner = async (ownerId) => {
        const isOwner = await this.prisma.Users.findFirst({
            where: {id: +ownerId},
            select: {type: true},
        })

        if(isOwner === "guest") {
            throw {code:400, message:"사장님만 할 수 있는 기능입니다."};
        } else {
            return isOwner;
        }
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
export class UsersRepositories {
    constructor(prisma) {
      this.prisma = prisma;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.prisma.users.findFirst({
            where: {id: +id}, 
        })
        return restaurant;
    }  

    getRestaurantsByValue = async (value) => {
        const restaurants = await this.prisma.
    }
}
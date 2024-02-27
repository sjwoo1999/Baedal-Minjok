export class RestaurantRepository {
    constructor(prisma) {
      this.prisma = prisma;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.prisma.Restaurants.findFirst({
            where: {id: +id}, 
            select: {
                id: true,
                name: true,
                callNumber: true,
                kind: true,
                restaurantInfo: true,
                sales: true,
            }
        })
        if(!restaurant) {
            throw {code:404, message:"해당 아이디를 가진 레스토랑이 조회되지 않습니다."};
        }
        return restaurant;
    }  

    getRestaurantsByKind = async (kind) => {
        const restaurants = await this.prisma.Restaurants.findMany({
            where: {
                kind: kind,
            },
            select: {
                name: true,
                kind: true,
                callNumber: true,
            },
        })
        if(!restaurants) {
            throw {code:404, message: "해당 카테고리의 식당이 존재하지 않습니다."};
        }
        return restaurants;
    }
}
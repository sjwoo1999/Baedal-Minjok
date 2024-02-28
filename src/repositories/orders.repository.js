export class OrdersRepository{
    constructor(prisma){
        this.prisma = prisma;
    }

    findOrdersByRestaurantId = async(restaurantId)=>{
        const orders = await this.prisma.orders.findMany({
            where:{
                restaurantId: +restaurantId
            }
        })

        return orders;
    }

    findOrdersByUserId = async(userId)=>{
        const orders = await this.prisma.orders.findMany({
            where:{
                userId: +userId
            }
        })

        return orders;
    }

    findOneOrderByOrderId = async(orderId)=>{
        const order = await this.prisma.orders.findFirst({
            where:{
                id: +orderId
            }
        })

        return order;
    }
}
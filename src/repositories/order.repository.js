export class OrderRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    // 주문 생성
    createOrder = async (userId, restaurantId, deliveryType, status, totPrice) => {
        const createdOrder = await this.prisma.Orders.create({
            data: {
                userId: +userId,
                restaurantId: +restaurantId,
                deliveryType: deliveryType,
                status: status,
                totalPrice: BigInt(totPrice),
            },
        });

        return createdOrder;
    };

    // 주문아이템 정보 생성
    createOrderDetail = async (orderId, menuId, quantity) => {
        await this.prisma.OrderDetails.create({
            data: {
                orderId: +orderId,
                menuId: +menuId,
                quantity: +quantity,
            },
        });
    };

    // 포인트 결제
    payPoint = async (userId, totPrice) => {
        await this.prisma.$transaction(async (tx) => {
            const userPoint = await tx.points.findFirst({
                where: {
                    userId: +userId,
                },
            });

            const updatePoint = userPoint.point - totPrice;

            await tx.points.update({
                where: {
                    id: userPoint.id,
                    userId: +userId,
                },
                data: {
                    point: updatePoint,
                },
            });
        });
    };

    findOrdersByRestaurantId = async (restaurantId) => {
        const orders = await this.prisma.orders.findMany({
            where: {
                restaurantId: +restaurantId,
            },
        });

        return orders;
    };

    findOrdersByUserId = async (userId) => {
        const orders = await this.prisma.orders.findMany({
            where: {
                userId: +userId,
            },
        });
        console.log('orders => @@@@@@@@@@@@', orders);
        return orders;
    };

    findOneOrderByOrderId = async (orderId) => {
        console.log('orderId => ', orderId);
        const order = await this.prisma.orders.findFirst({
            where: {
                id: +orderId,
            },
        });

        return order;
    };

    statusUpdateWithPoint = async (userId, orderId, status) => {
        await this.prisma.$transaction(async (tx) => {
            const order = await tx.orders.findFirst({
                where: {
                    id: +orderId,
                },
            });
            const point = await tx.points.findFirst({
                where: {
                    id: +userId,
                },
            });

            const updatePoint = point.point + parseFloat(order.totalPrice);

            if (order.status === 'DELIVERED') {
                await tx.orders.update({
                    where: {
                        id: +orderId,
                    },
                    data: {
                        status: status,
                    },
                });

                await tx.points.update({
                    where: {
                        id: +point.id,
                        userId: +userId,
                    },
                    data: {
                        point: updatePoint,
                    },
                });
            }
        });
    };
}

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

        // console.log('@@@@@@@@@@@@@@@@@');
        console.log(createdOrder);
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
            console.log('userPoint.point => ', userPoint.point);
            console.log(typeof userPoint.point);
            console.log('totPrice => ', totPrice);
            console.log(typeof totPrice);
            const updatePoint = userPoint.point - totPrice;

            console.log('updatePoint => ', updatePoint);
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
}

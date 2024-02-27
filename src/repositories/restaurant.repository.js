// 데이터 접근 및 조작
// 5.6 Layered Architecture Pattern - Repository
export class RestaurantsRepository {
    // 프리즈마 생성자 생성
    constructor(prisma) {
        this.prisma = prisma;
    }

    /*
        // PATCH
        deliveryDone = async () => {};

        // POST
        orderMenu = async (userId, restaurantId, deliveryType, status, totPrice, orderTime) => {
            // 저장소(Repository)에게 데이터를 요청합니다??
            const orderedMenu = await prisma.Order.orderMenu({
                data: {
                    userId,
                    restaurantId,
                    deliveryType,
                    status,
                    totPrice,
                    orderTime,
                },
            });
        };
    */
}

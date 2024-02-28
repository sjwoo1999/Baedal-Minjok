export class OrderService {
    constructor(orderRepository, menusRepository, usersRepository) {
        this.orderRepository = orderRepository;
        this.menusRepository = menusRepository;
        this.usersRepository = usersRepository;
    }

    order = async (userId, restaurantId, deliveryType, status, item) => {
        try {
            // 각 메뉴의 가격을 비동기적으로 가져옵니다.
            const prices = [];
            for (const menu of item) {
                const menus = await this.menusRepository.findMenuByIds(restaurantId, menu.menuId);
                prices.push(menus.price * menu.quantity); // 각 메뉴의 총 가격을 배열에 저장
            }

            // 총 가격 계산
            const totPrice = prices.reduce((total, price) => total + price, 0);

            // 주문 생성
            const orderId = await this.orderRepository.createOrder(
                userId,
                restaurantId,
                deliveryType,
                status,
                totPrice
            );

            // 주문 상세 정보 생성
            for (const menu of item) {
                await this.orderRepository.createOrderDetail(orderId.id, menu.menuId, menu.quantity);
            }

            // 포인트 결제
            await this.orderRepository.payPoint(userId, totPrice);
            console.log('여기 들어옴@@@@############');
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

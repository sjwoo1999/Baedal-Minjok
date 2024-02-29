import { NotFoundError, ValidationError } from '../utils/err/err.js';
export class OrderService {
    constructor(orderRepository, menusRepository, usersRepository, restaurantRepository) {
        this.orderRepository = orderRepository;
        this.menusRepository = menusRepository;
        this.usersRepository = usersRepository;
        this.restaurantRepository = restaurantRepository;
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

    checkOrder = async (ownerId, restaurantId) => {
        const checkOwner = await this.restaurantRepository.findRestaurantByUserId(ownerId);

        if (checkOwner.id !== +restaurantId) {
            throw new ValidationError('자신의 식당의 주문만 확인할 수 있습니다.');
        }
        const orders = await this.orderRepository.findOrdersByRestaurantId(restaurantId);

        orders.forEach((order) => {
            order.totalPrice = order.totalPrice.toString();
        });
        return orders;
    };

    findOrders = async (userId) => {
        const orders = await this.orderRepository.findOrdersByUserId(userId);

        orders.forEach((order) => {
            order.totalPrice = order.totalPrice.toString();
        });
        return orders;
    };

    findOneOrder = async (userId, orderId) => {
        const user = await this.usersRepository.findById(userId);
        const orderUser = await this.orderRepository.findOrdersByUserId(userId);

        if (+userId !== orderUser[0].userId) {
            throw new ValidationError('사장과 주문한 고객만 확인할 수 있습니다.');
        }

        const order = await this.orderRepository.findOneOrderByOrderId(orderId);

        if (!order) {
            throw new NotFoundError('해당 메뉴가 존재하지 않습니다.');
        }

        order.totalPrice = order.totalPrice.toString();
        return order;
    };

    updateDelivered = async (userId, restaurantId, orderId, status) => {
        const restaurant = await this.restaurantRepository.findRestaurantByUserId(userId);

        if (restaurant.id !== +restaurantId) {
            throw new Error('본인의 식당이 아닙니다.');
        }

        if (status === 'DELIVERED') {
            // 주문선택후 배달완료 업데이트
            await this.orderRepository.statusUpdateWithPoint(userId, orderId, status);
        } else {
            const order = await this.orderRepository.statusUpdate(orderId, status);
        }
    };
}

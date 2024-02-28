import { NotFoundError, ValidationError } from '../utils/err/err.js';

export class OrdersService {
    constructor(ordersRepository, restaurantRepository) {
        this.ordersRepository = ordersRepository;
        this.restaurantRepository = restaurantRepository;
    }

    checkOrder = async (ownerid, restaurantId) => {
        const checkOwner = await this.restaurantRepository.getRestaurantByUserId(ownerid);

        if(checkOwner.id !== +restaurantId){
            throw new ValidationError('자신의 식당의 주문만 확인할 수 있습니다.');
        }
        const orders = await this.ordersRepository.findOrdersByRestaurantId(restaurantId);
    }
}
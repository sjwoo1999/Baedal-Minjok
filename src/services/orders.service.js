import { NotFoundError, ValidationError } from '../utils/err/err.js';

export class OrdersService {
    constructor(ordersRepository, restaurantRepository, usersRepositories) {
        this.ordersRepository = ordersRepository;
        this.restaurantRepository = restaurantRepository;
        this.usersRepositories = usersRepositories;
    }

    checkOrder = async (ownerid, restaurantId) => {
        const checkOwner = await this.restaurantRepository.getRestaurantByUserId(ownerid);

        if(checkOwner.id !== +restaurantId){
            throw new ValidationError('자신의 식당의 주문만 확인할 수 있습니다.');
        }
        const orders = await this.ordersRepository.findOrdersByRestaurantId(restaurantId);

        return orders;
    }

    findOrders = async(userId)=>{
        const orders = await this.ordersRepository.findOrdersByUserId(userId);

        return orders;
    }

    findOneOrder = async(userId, orderId)=>{
        const user = await this.usersRepositories.findById(userId);
        const orderUser = await this.ordersRepository.findOrdersByUserId(userId);

        if(user.type !=="OWNER" || +userId !==orderUser.userId){
            throw new ValidationError('사장과 주문한 고객만 확인할 수 있습니다.');
        }
        
        const order = await this.ordersRepository.findOneOrderByOrderId(orderId);

        if(!order){
            throw new NotFoundError('해당 메뉴가 존재하지 않습니다.');
        }
        return order;
    }
}
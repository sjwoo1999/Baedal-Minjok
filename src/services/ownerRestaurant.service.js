import { AlreadyExistsError } from '../utils/err/err.js';

export class OwnerService {
    constructor(ownerRepository, restaurantRepository) {
        this.ownerRepository = ownerRepository;
        this.restaurantRepository = restaurantRepository;
    }

    // 레스토랑 생성
    createRestaurant = async (id, name, callNumber, kind, restaurantInfo, sales, orderCount, rate) => {
        const isExistRestaurant = await this.restaurantRepository.findRestaurantByUserId(id);

        if (isExistRestaurant) {
            throw new AlreadyExistsError('레스토랑이 이미 존재합니다. 개인이 가질수 있는 레스토랑은 하나입니다.');
        }
        const restaurant = await this.ownerRepository.createRestaurant(
            id,
            name,
            callNumber,
            kind,
            restaurantInfo,
            sales,
            orderCount,
            rate
        );
        return restaurant;
    };

    // 레스토랑 업데이트
    updateRestaurant = async (restaurantId, updateData) => {
        const updateRestaurant = await this.ownerRepository.updateRestaurant(restaurantId, updateData);
        return updateRestaurant;
    };

    // 레스토랑 조회
    findRestaurantById = async (restaurantId) => {
        const restaurant = await this.ownerRepository.findRestaurantById(restaurantId);
        return restaurant;
    };

    // 레스토랑 삭제
    deleteRestaurant = async (restaurantId) => {
        const deleteRestaurant = await this.ownerRepository.deleteRestaurant(restaurantId);
        return deleteRestaurant;
    };
}

import { AlreadyExistsError } from '../utils/err/err.js';

export class OwnerService {
    constructor(ownerRepository, restaurantRepository) {
        this.ownerRepository = ownerRepository;
        this.restaurantRepository = restaurantRepository;
    }

    // isOwner = async (ownerId) => {
    //     const isOwner = await this.ownerRepository.isOwner(ownerId);
    //     return isOwner;
    // };

    createRestaurant = async (id, name, callNumber, kind, restaurantInfo, sales, orderCount) => {
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
            orderCount
        );
        return restaurant;
    };

    updateRestaurant = async (restaurantId, updateData) => {
        const updateRestaurant = await this.ownerRepository.updateRestaurant(restaurantId, updateData);
        return updateRestaurant;
    };

    findRestaurantById = async (restaurantId) => {
        const restaurant = await this.ownerRepository.findRestaurantById(restaurantId);
        return restaurant;
    };

    deleteRestaurant = async (restaurantId) => {
        const deleteRestaurant = await this.ownerRepository.deleteRestaurant(restaurantId);
        return deleteRestaurant;
    };
}

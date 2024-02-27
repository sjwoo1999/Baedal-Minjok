export default class OwnerService {
    constructor(ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    isOwner = async (ownerId) => {
        const isOwner = await this.ownerRepository.isOwner(ownerId);
        return isOwner;
    }

    createRestaurant = async (name, callNumber, kind, restaurantInfo) => {
        const restaurant = await this.ownerRepository.createRestaurant(name, callNumber, kind, restaurantInfo);
        return restaurant;
    }

    updateRestaurant = async (name, callNumber, kind, restaurantInfo) => {
        const updateRestaurant = await this.ownerRepository.updateRestaurant(name, callNumber, kind, restaurantInfo);
        return updateRestaurant;
    }
    findRestaurantById = async (restaurantId) => {
        const restaurant = await this.ownerRepository.findRestaurantById(restaurantId);
        return restaurant;
    }

    deleteRestaurant = async (restaurantId) => {
        const deleteRestaurant = await this.ownerRepository.deleteRestaurant(restaurantId);
        return deleteRestaurant;
    }
}
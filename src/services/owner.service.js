export class OwnerService {
    constructor(ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    isOwner = async (ownerId) => {
        const isOwner = await this.ownerRepository.isOwner(ownerId);
        return isOwner;
    };

    createRestaurant = async (id, name, callNumber, kind, restaurantInfo, sales, orderCount, rate) => {
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

    updateRestaurant = async (restaurantId, updateData) => {
        const updateRestaurant = await this.ownerRepository.updateRestaurant(
            restaurantId,
            updateData,
        );
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

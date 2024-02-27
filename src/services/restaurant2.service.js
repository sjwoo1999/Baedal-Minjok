export class restaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.restaurantRepository.getRestaurantById(id);
        return restaurant;
    };

    getRestaurantsByKind = async (kind) => {
        const restaurants = await this.restaurantRepository.getRestaurantsByKind(kind);
        return restaurants;
    }
}
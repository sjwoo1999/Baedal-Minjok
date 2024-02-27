export class restaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.restaurantRepository.getRestaurantById(id);
        return {
          id: restaurant.id,
          name: restaurant.name,
          callNumber: restaurant.callNumber,
          kind: restaurant.kind,
          restaurantInfo: restaurant.restaurantInfo,
          sales: restaurant.sales,
          rate: restaurant.rate,
        };
    };

    getRestaurantsByValue = async (value) => {
        
    }
}
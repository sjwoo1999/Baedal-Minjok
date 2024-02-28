export class RestaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.restaurantRepository.getRestaurantById(id);

        if (!restaurant) {
            throw { code: 404, message: '해당 아이디를 가진 레스토랑이 조회되지 않습니다.' };
        }

        return restaurant;
    };

    getRestaurantsByKind = async (kind) => {
        const restaurants = await this.restaurantRepository.getRestaurantsByKind(kind);

        if (!restaurants) {
            throw { code: 404, message: '해당 카테고리의 식당이 존재하지 않습니다.' };
        }

        return restaurants;
    };

    getRestaurantBySearch = async (value) => {
        const restaurants = await this.restaurantRepository.getRestaurantBySearch(value);

        if (!restaurants) {
            throw { code: 404, message: '해당 검색어를 포함하는 식당이 존재하지 않습니다.' };
        }

        return restaurants;
    };
}

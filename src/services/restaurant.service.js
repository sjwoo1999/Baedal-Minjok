import { NotFoundError } from '../utils/err/err.js';

export class RestaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    getRestaurantById = async (id) => {
        const restaurant = await this.restaurantRepository.getRestaurantById(id);

        if (!restaurant) {
            throw new NotFoundError('해당 아이디를 가진 레스토랑이 존재하지 않습니다.');
        }
        return restaurant;
    };

    getRestaurantsByKind = async (kind) => {
        const restaurants = await this.restaurantRepository.getRestaurantsByKind(kind);

        if (!restaurants) {
            throw new NotFoundError('해당 카테고리의 식당이 존재하지 않습니다.');
        }

        return restaurants;
    };

    getRestaurantsBySearch = async (value) => {
        const restaurants = await this.restaurantRepository.getRestaurantsBySearch(value);
        if (restaurants.length === 0) {
            throw new NotFoundError('키워드에 해당하는 식당이 존재하지 않습니다.');
        }


        return restaurants;
    };

    getRestaurants = async () => {
        const restaurants = await this.restaurantRepository.getRestaurants();

        if(!restaurants) {
            throw { code: 404, message: '식당 조회에 실패했습니다.'};
        }

        return restaurants;
    }
}

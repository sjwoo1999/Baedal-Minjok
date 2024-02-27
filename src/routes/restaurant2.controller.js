export class restaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService
    }

    getRestaurantById = async (req, res, next) => {
        const {id} = req.params;
        const restaurant = await this.restaurantService.getRestaurantById(id);
  
        return res.status(200).json({ data: restaurant });
    }

    getRestaurantByValue = async (req, res, next) => {
        const {value} = req.params;
        const restaurants = await this.restaurantService.getRestaurantByValue(value);

        return res.status(200).json({ data: restaurants });
    }
}
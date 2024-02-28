export class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }

    getRestaurantById = async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: '매장을 입력해주세요.' });
            }

            const restaurant = await this.restaurantService.getRestaurantById(id);

            return res.status(200).json({ data: restaurant });
        } catch (err) {
            next(err);
        }
    };

    getRestaurantsByKind = async (req, res, next) => {
        try {
            const { kind } = req.query;
            if (!kind) {
                return res.status(400).json({ message: '종류를 입력해주세요.' });
            }

            const restaurants = await this.restaurantService.getRestaurantsByKind(kind);

            return res.status(200).json({ data: restaurants });
        } catch (err) {
            next(err);
        }
    };

    // 검색어로 검색
    getRestaurantBySearch = async (req, res, next) => {
        try {
            const { value } = req.query;
            if (!value) {
                return res.status(400).json({ message: '검색어를 입력해주세요.' });
            }
            const restaurants = await this.restaurantService.getRestaurantBySearch(value);

            return res.status(200).json({ data: restaurants });
        } catch (err) {
            next(err);
        }
    };
}

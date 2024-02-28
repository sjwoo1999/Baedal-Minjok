export class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService
    }

    getRestaurantById = async (req, res, next) => {
        try{
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message: "ID가 입력되지 않았습니다."});
        }
        const restaurant = await this.restaurantService.getRestaurantById(id);
        return res.status(200).json({ data: restaurant });
        } catch (err) {
            next(err);
        }
    }

    getRestaurantsByKind = async (req, res, next) => {
        try{
        const {kind} = req.query;
        if(!kind) {
            return res.status(400).json({message: "종류를 입력해주세요."});
        }

        const restaurants = await this.restaurantService.getRestaurantsByKind(kind);

        return res.status(200).json({ data: restaurants });
        } catch (err) {
            next(err);
        }
    }
    
    // 검색어로 검색
    getRestaurantBySearchTerm = async (req, res, next) => {
        try{
            const {searchTerm} = req.query;
            if(!searchTerm) {
                return res.status(400).json({message: "검색어를 입력해주세요."});
            }
            const restaurants = await this.restaurantService.getRestaurantBy(searchTerm);
            
            return res.status(200).json({data : restaurants});
        } catch (err) {
            next(err);
        }
    } 
}
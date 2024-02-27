export class OwnerController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }

    createRestaurant = async (req, res, next) => {
        try {
            const { name, callNumber, kind, restaurantInfo } = req.body;
            const {ownerId} = req.user;
            
            await this.ownerService.isOwner(ownerId);

            if(!name || !callNumber || !kind || !restaurantInfo) {
                return res.status(400).json({message: "모든 항목을 입력하세요."});
            }

            const restaurant = await this.ownerService.createRestaurant(name, callNumber, kind, restaurantInfo);

            return restaurant;
        } catch (err) {
            next(err);
        }
    }

    updateRestaurant = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { name, callNumber, kind, restaurantInfo } = req.body;
            const { ownerId } = req.user;

            
            await this.ownerService.isOwner(ownerId);
            
            if(!name || !callNumber || !kind || !restaurantInfo) {
                return res.status(400).json({message: "모든 항목을 입력하세요."});
            }

            const existingRestaurant = await this.ownerService.findRestaurantById(restaurantId);
            
            if(!existingRestaurant){
                return res.status(404).json({message: "레스토랑 정보가 존재하지 않습니다."});
            }

            const updatedRestaurant = await this.ownerService.updateRestaurant(name, callNumber, kind, restaurantInfo);
            return updatedRestaurant;

        } catch (err) {
            next(err);
        }
    }

    deleteRestaurant = async (req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    }
    
}
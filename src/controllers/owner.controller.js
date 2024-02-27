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

        } catch (err) {
            next(err);
        }
    }
    
}
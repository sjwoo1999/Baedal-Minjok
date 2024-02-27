export class OwnerController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }

    createRestaurant = async (req, res, next) => {
        try {
            const { name, callNumber, kind, restaurantInfo, sales, orderCount, rate } = req.body;
            const { id } = req.user;

            const isOwner = await this.ownerService.isOwner(id);
            console.log('여기까지 들어옵니다.');
            if (!isOwner) {
                return res.status(400).json({ message: '사장님만 가능한 기능입니다.' });
            }

            if (!name || !callNumber || !kind || !restaurantInfo) {
                return res.status(400).json({ message: '모든 항목을 입력하세요.' });
            }

            const restaurant = await this.ownerService.createRestaurant(
                id,
                name,
                callNumber,
                kind,
                restaurantInfo,
                sales,
                orderCount,
                rate
            );

            return res.status(200).json({ message: '매장생성이 성공적으로 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    updateRestaurant = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { name, callNumber, kind, restaurantInfo } = req.body;
            const { ownerId } = req.user;

            await this.ownerService.isOwner(ownerId);

            if (!name || !callNumber || !kind || !restaurantInfo) {
                return res.status(400).json({ message: '모든 항목을 입력하세요.' });
            }

            const existingRestaurant = await this.ownerService.findRestaurantById(restaurantId);

            if (!existingRestaurant) {
                return res.status(404).json({ message: '레스토랑 정보가 존재하지 않습니다.' });
            }

            const updatedRestaurant = await this.ownerService.updateRestaurant(name, callNumber, kind, restaurantInfo);
            return updatedRestaurant;
        } catch (err) {
            next(err);
        }
    };

    deleteRestaurant = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;

            const existingRestaurant = await this.ownerService.findRestaurantById(restaurantId);

            if (!existingRestaurant) {
                return res.status(404).json({ message: '레스토랑 정보가 존재하지 않습니다.' });
            }

            const { ownerId } = req.user;

            await this.ownerService.isOwner(ownerId);

            const deleteRestaurant = await this.ownerService.deleteRestaurant(restaurantId);
            return deleteRestaurant;
        } catch (err) {
            next(err);
        }
    };
}

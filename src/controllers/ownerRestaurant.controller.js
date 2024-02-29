import { InconsistencyError } from '../utils/err/err.js';

export class OwnerController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }

    // 레스토랑 생성
    createRestaurant = async (req, res, next) => {
        try {
            const { name, callNumber, kind, restaurantInfo, sales, orderCount } = req.body;
            const { id, type } = req.user;

            if (!(type === 'OWNER')) {
                throw new InconsistencyError('사장권한이 없습니다.');
            }

            if (!name || !callNumber || !kind || !restaurantInfo) {
                return res.status(400).json({ errorMessage: '모든 항목을 입력하세요.' });
            }

            await this.ownerService.createRestaurant(id, name, callNumber, kind, restaurantInfo, sales, orderCount);

            return res.status(200).json({ successMessage: '매장생성이 성공적으로 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    // 레스토랑 수정
    updateRestaurant = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { name, callNumber, kind, restaurantInfo } = req.body;
            const { id, type } = req.user;

            if (!(type === 'OWNER')) {
                throw new InconsistencyError('사장권한이 없습니다.');
            }

            if (!name || !callNumber || !kind || !restaurantInfo) {
                return res.status(400).json({ errorMessage: '모든 항목을 입력하세요.' });
            }

            const existingRestaurant = await this.ownerService.findRestaurantById(restaurantId);
            const updateData = { name, callNumber, kind, restaurantInfo };
            if (!existingRestaurant) {
                return res.status(404).json({ errorMessage: '레스토랑 정보가 존재하지 않습니다.' });
            }

            await this.ownerService.updateRestaurant(restaurantId, updateData);
            return res.status(200).json({ successMessage: '레스토랑 수정이 완료되었습니다' });
        } catch (err) {
            next(err);
        }
    };

    // 레스토랑 삭제
    deleteRestaurant = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { id, type } = req.user;

            if (!(type === 'OWNER')) {
                throw new InconsistencyError('사장권한이 없습니다.');
            }

            // 오너 아이디랑 같이 검색!!!!!
            const existingRestaurant = await this.ownerService.findRestaurantById(restaurantId);

            if (!existingRestaurant) {
                return res.status(404).json({ errorMessage: '레스토랑 정보가 존재하지 않습니다.' });
            }

            await this.ownerService.deleteRestaurant(restaurantId);
            return res.status(200).json({ successMessage: '레스토랑 삭제가 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };
}

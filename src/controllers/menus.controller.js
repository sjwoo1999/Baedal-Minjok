export class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }

    /* 메뉴 생성 */
    createMenu = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { name, price, image, menuInfo } = req.body;
            const { id, type } = req.user;

            // 유저 타입이 사장인지 판별
            if (type !== 'OWNER') {
                return res.status(400).json({ errMessage: '사장만 할 수 있는 기능입니다.' });
            }
            // 필요한 요소들 입력했는지 확인
            if (!name) {
                return res.status(400).json({ errMessage: '메뉴 이름을 작성하세요.' });
            }
            if (!price) {
                return res.status(400).json({ errMessage: '가격을 작성하세요.' });
            }
            if (!menuInfo) {
                return res.status(400).json({ errMessage: '메뉴 설명을 작성하세요.' });
            }

            const menu = await this.menusService.createMenu(id, restaurantId, name, menuInfo, price, image);

            return res.status(201).json({ successMessage: `${menu.name}이(가) 등록되었습니다.` });
        } catch (err) {
            next(err);
        }
    };

    /* 메뉴 전체 조회 */
    findMenus = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;

            if (!restaurantId) {
                return res.status(400).json({ errMessage: '음식점을 입력하지 않았습니다.' });
            }

            const menus = await this.menusService.findAllMenus(restaurantId);

            return res.status(200).json({
                successMessage: '메뉴 조회에 성공하였습니다.',
                data: menus,
            });
        } catch (err) {
            next(err);
        }
    };

    /* 메뉴 상세 조회 */
    findOneMenu = async (req, res, next) => {
        try {
            const restaurantId = req.query.restaurantId;
            const menuId = req.query.menuId;

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId) {
                return res.status(400).json({ errMessage: '음식점을 입력하지 않았습니다.' });
            }
            if (!menuId) {
                return res.status(400).json({ errMessage: '메뉴 아이디를 입력하지 않았습니다.' });
            }

            const menu = await this.menusService.findOneMenu(restaurantId, menuId);

            // 객체 이름 넣어주기
            return res.status(200).json({
                successMessage: '메뉴 조회에 성공하였습니다.',
                data: menu,
            });
        } catch (err) {
            next(err);
        }
    };

    /* 메뉴 수정 */
    updateMenu = async (req, res, next) => {
        try {
            const restaurantId = req.query.restaurantId;
            const menuId = req.query.menuId;
            const updatedData = req.body;
            const { id, type } = req.user;

            // 사장인지 타입 확인한후 에러 던짐
            if (type !== 'OWNER') {
                return res.status(400).json({ errMessage: '사장만 할 수 있는 기능입니다.' });
            }

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId)
                return res.status(401).json({ errMessage: '수정하려는 레스토랑의 아이디를 입력하지 않았습니다.' });
            if (!menuId) return res.status(401).json({ errMessage: '수정하려는 메뉴의 아이디를 입력하지 않았습니다.' });

            await this.menusService.updatedMenu(id, restaurantId, menuId, updatedData);

            return res.status(201).json({ successMessage: '메뉴 수정에 성공하였습니다.' });
        } catch (err) {
            next(err);
        }
    };

    /* 메뉴 삭제 */
    deleteMenu = async (req, res, next) => {
        try {
            const restaurantId = req.query.restaurantId;
            const menuId = req.query.menuId;
            const password = req.body;
            const { id, type } = req.user;

            // 사장인지 타입 확인한후 에러 던짐
            if (type !== 'OWNER') {
                return res.status(400).json({ errMessage: '사장만 할 수 있는 기능입니다.' });
            }

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId)
                return res.status(401).json({ errMessage: '삭제하려는 레스토랑의 아이디를 입력하지 않았습니다.' });
            if (!menuId) return res.status(401).json({ errMessage: '삭제하려는 메뉴의 아이디를 입력하지 않았습니다.' });
            if (!password) return res.status(401).json({ errMessage: '비밀번호를 입력하지 않았습니다.' });

            await this.menusService.deleteMenu(id, restaurantId, menuId, password);

            return res.status(201).json({ successMessage: '메뉴 삭제에 성공하였습니다.' });
        } catch (err) {
            next(err);
        }
    };
}

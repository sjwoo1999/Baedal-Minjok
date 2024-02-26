export class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }

    /* 메뉴 생성 */
    createMenu = async (req, res, next) => {
        try {
            const { restaurantId} = req.params;
            const { name, price, image, menuInfo } = req.body;
            const userId = req.user;

            if (!userId) return res.status(400).json({ message: "로그인을 다시 하세요." });
            if (!name) {
                return res.status(400).json({ message: '메뉴 이름을 작성하세요.' });
            }
            if (!price) {
                return res.status(400).json({ message: '가격을 작성하세요.' });
            }
            if (!menuInfo) {
                return res.status(400).json({ message: '메뉴 설명을 작성하세요.' });
            }

            const menu = await this.menusService.createMenu({
                userId,
                restaurantId,
                name,
                menuInfo,
                price,
                image
            })

            return res.status(201).json({ message: `${name}이 등록되었습니다.` });
        } catch (err) {
            next(err);
        }
    }


    /* 메뉴 전체 조회 */
    findMenus = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;

            if (!restaurantId) {
                return res.status(400).json({ message: "음식점을 입력하지 않았습니다." })
            }

            const menus = await this.menusService.findAllMenus(restaurantId);

            return res.status(200).json(menus);
        } catch (err) {
            next(err);
        }
    }


    /* 메뉴 상세 조회 */
    findOneMenu = async (req, res, next) => {
        try {
            const { restaurantId, menuId } = req.params;
            if (!restaurantId) {
                return res.status(400).json({ message: "음식점을 입력하지 않았습니다." })
            }
            if (!menuId) {
                return res.status(400).json({ message: "메뉴 아이디를 입력하지 않았습니다." })
            }

            const menu = await this.menusService.findOneMenu(restaurantId, menuId);

            return res.status(200).json(menu);
        } catch (err) {
            next(err);
        }
    }

    /* 메뉴 수정 */
    updateMenu = async (req, res, next) => {
        try {
            const { restaurantId, menuId } = req.params;
            const updatedData = req.body;
            const { userId } = req.user;

            if (!userId) return res.status(400).json({ message: "로그인을 다시 하세요." });
            if (!restaurantId) return res.status(401).json({ message: "수정하려는 레스토랑의 아이디를 입력하지 않았습니다." });
            if (!menuId) return res.status(401).json({ message: "수정하려는 메뉴의 아이디를 입력하지 않았습니다." });

            await this.menusService.updatedMenu(userId, restaurantId, menuId, updatedData);
            return res.status(201).json({message: "메뉴 수정에 성공하였습니다."});
        } catch (err) {
            next(err);
        }
    }

    /* 메뉴 삭제 */
    deleteMenu = async (req, res, next) => {
        try {
            const { restaurantId, menuId } = req.params;
            const password = req.body;
            const { userId } = req.user;

            if (!userId) return res.status(400).json({ message: "로그인을 다시 하세요." });
            if (!restaurantId) return res.status(401).json({ message: "삭제하려는 레스토랑의 아이디를 입력하지 않았습니다." });
            if (!menuId) return res.status(401).json({ message: "삭제하려는 메뉴의 아이디를 입력하지 않았습니다." });
            if (!password) return res.status(401).json({ message: "비밀번호를 입력하지 않았습니다." });

            await this.menusService.deleteMenu(userId, restaurantId, menuId, password);

            return res.status(201).json({message: "메뉴 삭제에 성공하였습니다."});
        } catch (err) {
            next(err);
        }
    }
}
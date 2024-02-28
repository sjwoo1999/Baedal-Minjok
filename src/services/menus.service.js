import bcrypt from 'bcrypt';

export class MenusService {
    constructor(menusRepository, usersRepository, restaurantRepository) {
        this.menusRepository = menusRepository;
        this.usersRepository = usersRepository;
        this.restaurantRepository = restaurantRepository;
    }

    createMenu = async (userId, restaurantId, name, menuInfo, price, image) => {
        let validation = await this.restaurantRepository.compareUserAndRestaurant(userId);

        if (validation.id === +restaurantId) {
            validation = true;
        } else {
            validation = false;
        }

        if (!validation) {
            throw { code: 400, message: '자신의 식당의 메뉴만 작성할 수 있습니다.' };
        }

        const menu = await this.menusRepository.createMenu(restaurantId, name, menuInfo, price, image);

        return menu;
    };

    findAllMenus = async (restaurantId) => {
        const menus = await this.menusRepository.findMenusByRestaurantId(restaurantId);

        // 에러처리 -> 메뉴가 없다면 메뉴가 없습니다. 메시지 반환

        return menus;
    };

    // 메뉴 아이디 안가져옴!!!! 메뉴아이디 추가 !!!
    findOneMenu = async (restaurantId) => {
        const menu = await this.menusRepository.findMenuByRestaurantId(restaurantId);

        return menu;
    };

    updatedMenu = async (userId, restaurantId, menuId, updatedData) => {
        let validation = await this.restaurantRepository.compareUserAndRestaurant(userId);

        if (validation.id === +restaurantId) {
            validation = true;
        } else {
            validation = false;
        }

        if (!validation) {
            throw { code: 400, message: '자신의 식당의 메뉴만 수정할 수 있습니다.' };
        }

        await this.menusRepository.updateMenu(restaurantId, menuId, updatedData);
    };

    deleteMenu = async (userId, restaurantId, menuId, password) => {
        const user = await this.usersRepository.findById(userId);

        const comparison = await bcrypt.compare(password.password, user.password);

        // 에러 클래스 미들웨어 사용해보기
        if (!comparison) {
            throw { code: 400, message: '자신의 식당의 메뉴만 삭제가 가능합니다.' };
        }

        const menu = await this.menusRepository.deleteMenu(restaurantId, menuId);
    };
}

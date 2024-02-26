export class MenusService {
    constructor(menusRepository) {
        this.menusRepository = menusRepository;
    }

    createMenu = async (userId, restaurantId, name, menuInfo, price, image) => {
        const validation = await this.menusRepository.compareUserAndRestaurant(userId, restaurantId);
        if (!validation) {
            throw { code: 400, message: "자신의 식당의 메뉴만 작성할 수 있습니다." };
        }

        const menu = await this.menusRepository.createMenu(restaurantId, name, menuInfo, price, image);

        return menu;
    }

    findAllMenus = async (restaurantId) => {
        if (!restaurantId) throw { code: 400, message: "원하는 식당의 아이디를 입력해야합니다." };
        const menus = await this.menusRepository.findMenusByRestaurantId(restaurantId);

        return menus;
    }

    findOneMenu = async (restaurantId) => {
        if (!restaurantId) throw { code: 400, message: "원하는 식당의 아이디를 입력해야합니다." };
        const menu = await this.menusRepository.findMenuByRestaurantId(restaurantId);

        return menu;
    }

    updatedMenu = async (userId, restaurantId, menuId, updatedData) => {
        const validation = await this.menusRepository.compareUserAndRestaurant(userId, restaurantId);
        if (!validation) {
            throw { code: 400, message: "자신의 식당의 메뉴만 수정할 수 있습니다." };
        }

        const menu = await this.menusRepository.updateMenu(restaurantId, menuId, updatedData);
        return menu;
    }

    deleteMenu = async(userId, restaurantId, menuId, password)=>{
        const comparison = await this.menusRepository.comparePassword(userId, password);
        if(!comparison){
            throw { code: 400, message: "본인 식당의 메뉴만 삭제가 가능합니다."};
        }

        const menu = await this.menusRepository.deleteMenu(restaurantId, menuId);
        return menu;
    }
}
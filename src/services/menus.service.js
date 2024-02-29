import bcrypt from 'bcrypt';
import { InconsistencyError, NotFoundError, ValidationError, AlreadyExistsError } from '../utils/err/err.js';

export class MenusService {
    constructor(menusRepository, usersRepository, restaurantRepository) {
        this.menusRepository = menusRepository;
        this.usersRepository = usersRepository;
        this.restaurantRepository = restaurantRepository;
    }

    // 메뉴 생성
    createMenu = async (userId, restaurantId, name, menuInfo, price, image) => {
        let validation = await this.restaurantRepository.findRestaurantByUserId(userId);

        if (validation.id === +restaurantId) {
            validation = true;
        } else {
            validation = false;
        }

        if (!validation) {
            throw new ValidationError('자신의 식당의 메뉴만 작성할 수 있습니다.');
        }

        const checkMenu = await this.menusRepository.findMenuByName(name);
        if (checkMenu) {
            throw new AlreadyExistsError('이미 존재하는 메뉴입니다.');
        }

        const menu = await this.menusRepository.createMenu(restaurantId, name, menuInfo, price, image);

        return menu;
    };

    // 메뉴 전체 조회
    findAllMenus = async (restaurantId) => {
        const menus = await this.menusRepository.findMenusByRestaurantId(restaurantId);

        if (!menus) {
            throw new NotFoundError('해당 메뉴가 존재하지 않습니다.');
        }

        return menus;
    };

    // 메뉴 상세조회
    findOneMenu = async (restaurantId, menuId) => {
        const menu = await this.menusRepository.findMenuByIds(restaurantId, menuId);
        if (!menu) {
            throw new NotFoundError('해당 메뉴가 존재하지 않습니다.');
        }
        return menu;
    };

    // 메뉴 업데이트
    updatedMenu = async (userId, restaurantId, menuId, updatedData) => {
        let validation = await this.restaurantRepository.findRestaurantByUserId(userId);

        if (validation.id === +restaurantId) {
            validation = true;
        } else {
            validation = false;
        }

        if (!validation) {
            throw new ValidationError('자신의 식당의 메뉴만 작성할 수 있습니다.');
        }

        if (updatedData.name) {
            const checkMenu = await this.menusRepository.findMenuByName(updatedData.name);
            if (checkMenu) {
                throw new AlreadyExistsError('이미 존재하는 메뉴 이름입니다.');
            }
        }

        const menu = await this.menusRepository.findMenuByIds(restaurantId, menuId);
        if (!menu) {
            throw new NotFoundError('수정하려는 메뉴가 존재하지 않습니다.');
        }

        await this.menusRepository.updateMenu(restaurantId, menuId, updatedData);
    };

    // 메뉴 삭제
    deleteMenu = async (userId, restaurantId, menuId, password) => {
        const user = await this.usersRepository.findById(userId);

        const comparison = await bcrypt.compare(password.password, user.password);

        if (!comparison) {
            throw new InconsistencyError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        }

        const menu = await this.menusRepository.findMenuByIds(restaurantId, menuId);
        if (!menu) {
            throw new NotFoundError('삭제하려는 메뉴가 존재하지 않습니다.');
        }

        await this.menusRepository.deleteMenu(restaurantId, menuId);
    };
}

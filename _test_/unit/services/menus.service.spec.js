import { MenusService } from "../../../src/services/menus.service";
import { describe, jest } from '@jest/globals';

let mockMenusRepository = {
    createMenu: jest.fn(),
    findMenuByName: jest.fn(),
    findMenusByRestaurantId: jest.fn(),
    findMenuByIds: jest.fn(),
    updateMenu: jest.fn(),
    deleteMenu: jest.fn()
}
let mockUserRepository = {
    findById: jest.fn()
}
let mockRestaurantRepository = {
    findRestaurantByUserId: jest.fn()
}

let menusService = new MenusService(mockMenusRepository);

describe('Menus Service Unit Test', () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
    })

    test('createMenu Method test', async () => {
        const returnValue = "createMenu return값"
        const validationReturn = {id:1};
        const checkMenuReturn = null;
        const createMenuIngredients = {
            data: {
                restaurantId: 1,
                name: "테스트용 메뉴 이름",
                menuInfo: "테스트용 메뉴 설명",
                price: 10000,
                image: "테스트용 메뉴 이미지",
            }
        }

        mockMenusRepository.createMenu.mockReturnValue(returnValue);
        mockRestaurantRepository.findRestaurantByUserId.mockReturnValue(validationReturn);
        mockMenusRepository.findMenuByName.mockReturnValue(checkMenuReturn);
        const realReturnValue = await menusService.createMenu(1, 1, "테스트용 메뉴 이름", "테스트용 메뉴 설명", 10000, "테스트용 메뉴 이미지")

        expect(realReturnValue).toEqual(returnValue);
        expect(mockRestaurantRepository.findRestaurantByUserId).toHaveBeenCalledTimes(1);
        expect(mockMenusRepository.findMenuByName).toHaveBeenCalledTimes(1);
        expect(mockMenusRepository.createMenu).toHaveBeenCalledTimes(1);
    })

})
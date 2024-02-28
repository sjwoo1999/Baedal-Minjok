import { MenusRepository } from '../../../src/repositories/menus.repository.js';
import { describe, jest } from '@jest/globals';

let mockPrisma = {
    Menus: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

let menusRepository = new MenusRepository(mockPrisma);

describe('Menus Repository Unit test', () => {
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
    });

    test('createMenu Method test', async () => {
        // 목표로 하는 반환값
        const mockReturn = 'create Menu Return String';
        mockPrisma.Menus.create.mockReturnValue(mockReturn);

        // createMenu를 실행하기 위해 restaurantId, name, menuInfo, price, image의 데이터를 전달한다.
        const createMenuIngredients = {
            restaurantId: 1,
            name: "레스토랑 이름",
            menuInfo: "레스토랑 정보",
            price: 500,
            image: "https://img.freepik.com/premium-photo/tomato-spaghetti-on-black-plate-on-dark-slate-table-tomato-sauce-pasta-is-classic-italian-cuisine-dish-italian-food_107796-115.jpg"
        };

        const createMenuData = await menusRepository.createMenu(
            createMenuIngredients.restaurantId,
            createMenuIngredients.name,
            createMenuIngredients.menuInfo,
            createMenuIngredients.price,
            createMenuIngredients.image
        );

        expect(createMenuData).toEqual(mockReturn);

        expect(mockPrisma.Menus.create).toHaveBeenCalledTimes(1);

        expect(mockPrisma.Menus.create).toHaveBeenCalledWith({
            data: {
                restaurantId: createMenuIngredients.restaurantId,
                name: createMenuIngredients.name,
                menuInfo: createMenuIngredients.menuInfo,
                price: createMenuIngredients.price,
                image: createMenuIngredients.image
            }
        });
    })

    test('findMenusByRestaurantId Method test', async () => {
        const findMenusByRestaurantIdIngredient = {
            restaurantId: 1
        };
        const returnFindMenusByRestaurantIdValue = {
            id: 1,
            restaurantId: 1,
            name: "테스트용 메뉴 이름",
            price: 1000,
            image: "테스트용 메뉴 이미지"
        }

        mockPrisma.Menus.findMany.mockReturnValue(returnFindMenusByRestaurantIdValue);

        const menu = await menusRepository.findMenusByRestaurantId(findMenusByRestaurantIdIngredient.restaurantId);
        expect(mockPrisma.Menus.findMany).toHaveBeenCalledTimes(1);
        expect(menu).toHaveProperty('id');
        expect(menu).toHaveProperty('restaurantId');
        expect(menu).toHaveProperty('name');
        expect(menu).toHaveProperty('price');
    })

    test('findMenuByIds Method test', async () => {
        const findMenuByIdsIngredients = {
            id: 1,
            restaurantId: 1
        };
        const returnfindMenuByIdsValue = {
            id: 1,
            restaurantId: 1,
            name: "테스트용 메뉴 이름",
            menuInfo: "테스트용 메뉴 설명",
            price: 1000,
            image: "테스트용 메뉴 이미지"
        }

        mockPrisma.Menus.findFirst.mockReturnValue(returnfindMenuByIdsValue);

        const menu = await menusRepository.findMenuByIds(findMenuByIdsIngredients.id, findMenuByIdsIngredients.restaurantId);

        expect(mockPrisma.Menus.findFirst).toHaveBeenCalledTimes(1);
        expect(menu).toBe(returnfindMenuByIdsValue);
    })

    test('findMenuByName Method test', async()=>{
        const findMenuByNameIngredient = {
            name: "테스트용 메뉴 이름"
        };
        const returnfindMenuByNameValue = {
            id:1,
            restaurantId:1,
            name:"테스트용 메뉴 이름",
            menuInfo:"테스트용 메뉴 설명",
            price: 10000,
            image:"테스트용 메뉴 이미지"
        }

        mockPrisma.Menus.findFirst.mockReturnValue(returnfindMenuByNameValue);

        const menu = await menusRepository.findMenuByIds(findMenuByNameIngredient.name);

        expect(mockPrisma.Menus.findFirst).toHaveBeenCalledTimes(1);
        expect(menu).toBe(returnfindMenuByNameValue);
    })
})
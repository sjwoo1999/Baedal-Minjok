import bcrypt from 'bcrypt';
import { MenusRepository } from '../../../src/repositories/menus.repository';
import { describe, jest } from '@jest/globals';


let mockPrisma = {
    Menus: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    },
    Restaurants: {
        findFirst: jest.fn()
    },
    Users: {
        findFirst: jest.fn()
    }
};

let menusRepository = new MenusRepository(mockPrisma);

describe('Menus Repository Unit test', () => {
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
    });

    test('createMenu Method', async () => {
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
            data:{
                restaurantId: createMenuIngredients.restaurantId,
                name: createMenuIngredients.name,
                menuInfo: createMenuIngredients.menuInfo,
                price: createMenuIngredients.price,
                image: createMenuIngredients.image
            }
        });
    })

    // test('CompareUserAndRestaurant Method true 반환 테스트', async()=>{
    //     // user의 아이디와 restaurant의 아이디를 같게 지정해준다.
    //     // 둘을 비교하여 true가 도출되도록 한다.
    //     const mockReturn = 'true';
        
    // })
})
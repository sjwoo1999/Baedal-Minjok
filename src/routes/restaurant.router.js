import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const router = express.Router();
const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

/* 문제 발생!!!!!!!!!!!!
    1. 경로를 
        restaurant/:id
        restaurant/category
        restaurant/search
       이런순으로 짜버리면 :id는 숫자뿐만 아니라 문자열도 같이 받기 때문에 아래의 쿼리가 들어오는 경로는
       전부 /:id의 경로로 들어가 버리게 됨!

       그러므로 경로를 detailRestaurant/:id로 하던지
       아니면 레스토랑 상세 조회의 경로 위치를 제일 아래로 내리던지 해야함.

       이유 : 모두 httpMethod가 get방식이기 때문!!
*/

// 모든 식장 조회
router.get('/', restaurantController.getRestaurants);

// 레스토랑 카테고리
router.get('/category', restaurantController.getRestaurantsByKind);

// 레스토랑 검색
router.get('/search', restaurantController.getRestaurantsBySearch);

// // 레스토랑 상세조회
router.get('/detailRestaurant/:id', restaurantController.getRestaurantById);
export default router;

import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const router = express.Router();
const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

// 모든 식장 조회
router.get('/restaurants', restaurantController.getRestaurants);

// 레스토랑 카테고리
router.get('/category', restaurantController.getRestaurantsByKind);

// 레스토랑 검색
router.get('/search', restaurantController.getRestaurantsBySearch);

// // 레스토랑 상세조회
router.get('/detailRestaurant/:id', restaurantController.getRestaurantById);
export default router;

import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { RestaurantController } from "../controllers/restaurant2.controller.js";
import { RestaurantService } from "../services/restaurant2.service.js";
import { RestaurantRepository } from "../repositories/restaurant2.repository.js";
const router = express.Router();
const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

router.get('/restaurant/:id', restaurantController.getRestaurantById);

router.get('/restaurant/kind', restaurantController.getRestaurantsByKind);

//여기 searchTerm으로 갈꺼면, 위에 종류검색도 경로 바꿔줘야하는지??
router.get('/restaurant/searchTerm', restaurantController.getRestaurantBySearchTerm);

export default router;
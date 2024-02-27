import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { RestaurantController } from "../controllers/restaurant2.controller.js";
import { RestaurantService } from "../services/restaurant.service.js";
import { RestaurantRepository } from "../repositories/restaurant2.repository.js";
const router = express.Router();
const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

router.get('/restaurant/:id', restaurantController.getRestaurantById);



router.get('/restaurant/search', restaurantController.getRestaurantsByKind);

export default router;
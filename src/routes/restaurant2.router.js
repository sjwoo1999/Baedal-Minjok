import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { RestaurantController } from "../controllers/restaurant2.controller.js";
import { RestaurantServices } from "../services/restaurant2.service.js";
import { RestaurantRepositories } from "../repositories/restaurant2.repository.js";
const router = express.Router();
const restaurantRepository = new RestaurantRepositories(prisma);
const restaurantService = new RestaurantServices(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

router.get('/restaurant/:id', restaurantController.getRestaurantById);

router.get('/restaurant/search', restaurantController.getRestaurantsByKind);

export default router;
import express from "";
import { prisma } from "";
import { RestaurantController } from "";
import { RestaurantServices } from "";
import { RestaurantRepositories } from "";
import authMiddleware from "";

const restaurantRepository = new RestaurantRepositories(prisma);
const restaurantService = new RestaurantServices(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

router.get('/:id', restaurantController.getRestaurantById);

router.get('/search', restaurantController.getRestaurantsByValue);

export default router;
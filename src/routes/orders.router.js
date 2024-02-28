import express from 'express';
import { OrdersController} from '../controllers/orders.controller.js';
import { OrdersService } from '../services/orders.service.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { UsersRepositories } from '../repositories/users.repositories.js';
import {prisma} from '../utils/prisma/index.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';

const router = express.Router();
const ordersRepository = new OrdersRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const usersRepositories = new UsersRepositories(prisma);
const ordersService = new OrdersService(ordersRepository, restaurantRepository, usersRepositories);
const ordersController = new OrdersController(ordersService);
const authService = new AuthService(usersRepositories);
const authController = new AuthController(authService);

/* order 생성 */

/* order 사장이 매장 주문들 확인*/
router.get('/owner/:restaurantId', authController.authMiddleWare, ordersController.ownerGetOrders);

/* order 고객이 자기 주문들 확인 */
router.get('/user', authController.authMiddleWare, ordersController.guestGetOrder);

/* order 고객이나 사장이 특정 주문 확인 */
router.get('/oneOrder/:orderId', authController.authMiddleWare, ordersController.getOneOrder);

export default router;
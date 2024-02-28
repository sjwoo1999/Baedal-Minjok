import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';
import { UsersRepositories } from '../repositories/users.repositories.js';
import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.services.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { MenusRepository } from '../repositories/menus.repository.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const router = express.Router();

const orderRepository = new OrderRepository(prisma);
const menusRepository = new MenusRepository(prisma);
const usersRepository = new UsersRepositories(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const orderService = new OrderService(orderRepository, menusRepository, usersRepository, restaurantRepository);
const orderController = new OrderController(orderService);

const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 주문결제
router.post('/:restaurantId/order/', authController.authMiddleWare, orderController.order);

/* order 사장이 매장 주문들 확인*/
router.get('/owner/:restaurantId', authController.authMiddleWare, orderController.ownerGetOrders);

/* order 고객이 자기 주문들 확인 */
router.get('/user', authController.authMiddleWare, orderController.guestGetOrder);

/* order 고객이나 사장이 특정 주문 확인 */
router.get('/oneOrder/:orderId', authController.authMiddleWare, orderController.getOneOrder);

router.patch('/owner/:restaurantId/order/:orderId', authController.authMiddleWare, orderController.updateDelivery);

export default router;

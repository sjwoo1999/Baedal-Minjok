import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';
import { UsersRepositories } from '../repositories/users.repositories.js';
import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.services.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { MenusRepository } from '../repositories/menus.repository.js';

const router = express.Router();

const orderRepository = new OrderRepository(prisma);
const menusRepository = new MenusRepository(prisma);
const usersRepository = new UsersRepositories(prisma);
const orderService = new OrderService(orderRepository, menusRepository, usersRepository);
const orderController = new OrderController(orderService);

const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 주문결제
router.post('/:restaurantId/order/', authController.authMiddleWare, orderController.order);

export default router;

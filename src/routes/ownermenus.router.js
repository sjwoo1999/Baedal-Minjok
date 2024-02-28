import express from 'express';
import { MenusController } from '../controllers/menus.controller.js';
import { MenusService } from '../services/menus.service.js';
import { MenusRepository } from '../repositories/menus.repository.js';
import { prisma } from '../utils/prisma/index.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { UsersRepositories } from '../repositories/users.repositories.js';

const router = express.Router();
const usersRepository = new UsersRepositories(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);
const menusRepository = new MenusRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const menusService = new MenusService(menusRepository, usersRepository, restaurantRepository);
const menusController = new MenusController(menusService);

/* menu 생성 (사장님) */
router.post('/menu/:restaurantId', authController.authMiddleWare, menusController.createMenu);

/* menu 수정 (사장님) */
router.patch('/menu', authController.authMiddleWare, menusController.updateMenu);

/* menu 삭제 (사장님) */
router.delete('/menu', authController.authMiddleWare, menusController.deleteMenu);

export default router;

import express from 'express';
import { MenusController } from '../controllers/menus.controller.js';
import { MenusService } from '../services/menus.service.js';
import { MenusRepository } from '../repositories/menus.repository.js';
import { prisma } from '../utils/prisma/index.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';

const router = express.Router();
const menusRepository = new MenusRepository(prisma);
const menusService = new MenusService(menusRepository);
const menusController = new MenusController(menusService);
const authService = new AuthService(menusRepository);
const authController = new AuthController(authService);

/* menu 전체 조회 */
router.get('/restaurant/:restaurantId/menus', menusController.findMenus);

/* menu 상세 조회 */
router.get('/restaurant/:restaurantId/menu/:menuId', menusController.findOneMenu);

export default router;
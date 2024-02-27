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

/* menu 생성 (사장님) */
router.post('/restaurant/:restaurantId/menu', authController.authMiddleWare, menusController.createMenu);

/* menu 수정 (사장님) */
router.patch('/restaurant/:restaurantId/menu/:menuId', authController.authMiddleWare, menusController.updateMenu);

/* menu 삭제 (사장님) */
router.delete('/restaurant/:restaurantId/menu/:menuId', authController.authMiddleWare, menusController.deleteMenu);

export default router;
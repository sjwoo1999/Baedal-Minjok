import express from 'express';
import { MenusController } from '../controllers/menus.controller.js';
import { MenusService } from '../services/menus.service.js';
import { MenusRepository } from '../repositories/menus.repository.js';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();
const menusRepository = new MenusRepository(prisma);
const menusService = new MenusService(menusRepository);
const menusController = new MenusController(menusService);

/* menu 전체 조회 */
router.get('/restaurant/:restaurantId/menus', menusController.findMenus);

/* menu 상세 조회 */
router.get('/restaurant/menu', menusController.findOneMenu);

export default router;

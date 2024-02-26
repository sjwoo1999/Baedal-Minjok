import express from 'express';
import {MenusController} from '../controllers/menus.controller.js';
import {MenusService} from '../services/menus.service.js';
import {MenusRepository} from '../repositories/menus.repository.js';
import { Prisma } from '@prisma/client';

const router = express.Router();
const menusRepository = new MenusRepository(Prisma);
const menusService = new MenusService(menusRepository);
const menusController = new MenusController(menusService);

/* menu 생성 (사장님) */
router.post('/owner/:ownerId/restaurant/:restaurnatId/menu', authMiddleware, menusController.createMenu);

/* menu 전체 조회 */
router.get('/restaurant/:restaurantId/menus',menusController.findMenus);

/* menu 상세 조회 */
router.get('/restaurant/:restaurantId/menu/:menuId',menusController.findOneMenu);

/* menu 수정 (사장님) */
router.patch('/owner/:ownerId/restaurant/:restaurantId/menu/:menuId', authMiddleware, menusController.updateMenu);

/* menu 삭제 (사장님) */
router.delete('/owner/:ownerId/restaurant/:restaurantId/menu/:menuId', authMiddleware, menusController.deleteMenu);

export default router;
import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { OwnerService } from '../services/owner.service.js';
import { OwnerRepository } from '../repositories/owner.repository.js';
import { OwnerController } from '../controllers/owner.controller.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';
import { UsersRepositories } from '../repositories/users.repositories.js';

const router = express.Router();
const ownerRepository = new OwnerRepository(prisma);
const ownerService = new OwnerService(ownerRepository);
const ownerController = new OwnerController(ownerService);

const usersRepository = new UsersRepositories(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 레스토랑 생성
router.post('/restaurant', authController.authMiddleWare, ownerController.createRestaurant);

// 레스토랑 수정
router.patch('/restaurant/:restaurantId', authController.authMiddleWare, ownerController.updateRestaurant);

router.delete('/restaurant/:restaurantId', authController.authMiddleWare, ownerController.deleteRestaurant);

export default router;

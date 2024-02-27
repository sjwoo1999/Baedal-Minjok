import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import {OwnerService} from '../services/owner.service.js';
import {OwnerRepository} from '../repositories/owner.repository.js';
import { OwnerController } from '../controllers/owner.controller.js';
import {AuthController} from '../middlewares/auth/auth.middleware.controller.js';
import {AuthService} from '../middlewares/auth/auth.middleware.service.js';

const router = express.Router();
const ownerRepository = new OwnerRepository(prisma);
const ownerService = new OwnerService(ownerRepository);
const ownerController = new OwnerController(ownerService);

const authService = new AuthService(ownerRepository);
const authController = new AuthController(authService);

router.post('/restaurant', authController.authMiddleWare, ownerController.createRestaurant);

router.patch('/restaurant/:restaurantId', authController.authMiddleWare, ownerController.updateRestaurant);

router.delete('/restaurant/:restaurantId', authController.authMiddleWare, ownerController.deleteRestaurant);

export default router;
import express from 'express';
import UserRouter from './users.router.js';
import OwnerMenuRouter from './ownermenus.router.js';
import OwnerRouter from './owner.router.js';
import RestaurantRouter from './restaurant.router.js';

const router = express.Router();

router.use('/users/', UserRouter);
router.use('/owner/', OwnerRouter, OwnerMenuRouter);
router.use('/restaurant/', RestaurantRouter);

export default router;

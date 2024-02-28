import express from 'express';
import UserRouter from './users.router.js';
import OwnerMenuRouter from './ownermenus.router.js';
import OwnerRouter from './ownerRestaurant.router.js';
import RestaurantRouter from './restaurant.router.js';
import MenusRouter from './menus.router.js';
import ReviewsRouter from './reviews.router.js';
import OrdersRouter from './orders.router.js';

const router = express.Router();

router.use('/users/', UserRouter);
router.use('/owner/', OwnerRouter, OwnerMenuRouter);
router.use('/restaurant/', RestaurantRouter, MenusRouter, ReviewsRouter, OrdersRouter);
router.use('/order/', OrdersRouter);

export default router;

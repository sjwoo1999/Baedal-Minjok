import express from 'express';
import UserRouter from './users.router.js';
import OwnerMenuRouter from './ownermenus.router.js';
import OwnerRouter from './ownerRestaurant.router.js';
import RestaurantRouter from './restaurant.router.js';
import MenusRouter from './menus.router.js';
import ReviewsRouter from './reviews.router.js';
import OrderRouter from './order.router.js';

const router = express.Router();

// 유저 관련(회원가입 - 로그인 - 로그아웃 - 마이페이지)
router.use('/users/', UserRouter);

// 사장님 관련(레스토랑 CUD 및 메뉴 CUD)
router.use('/owner/', OwnerRouter, OwnerMenuRouter);

// 레스토랑 사용기능(레스토랑R, 메뉴R, 리뷰 CRUD, 주문기능)
router.use('/restaurant/', RestaurantRouter, MenusRouter, ReviewsRouter, OrderRouter);

export default router;

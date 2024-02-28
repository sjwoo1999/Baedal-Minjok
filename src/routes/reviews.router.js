// 라우팅 설정 및 컨트롤러 연결

import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { ReviewsController } from '../controllers/reviews.controller.js';
import { ReviewsServices } from '../services/reviews.services.js';
import { ReviewsRepository } from '../repositories/reviews.repository.js';
import { UsersRepositories } from '../repositories/users.repositories.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';
const router = express.Router();

const reviewsRepository = new ReviewsRepository(prisma);
const usersRepositories = new UsersRepositories(prisma);
const reviewsService = new ReviewsServices(reviewsRepository, usersRepositories);
const reviewsController = new ReviewsController(reviewsService);

const authService = new AuthService(usersRepositories);
const authController = new AuthController(authService);

/** 리뷰 생성 **/
router.post('/:restaurantId/review', authController.authMiddleWare, reviewsController.createReview);

/** 리뷰 리스트 조회 **/
// router.get('/:restaurantId/review', reviewsController.getReviewList);

/** 리뷰 세부사항 조회 **/
router.get('/:restaurantId/review/:reviewId', reviewsController.getReviewDetail);

/** 리뷰 수정 **/
router.patch('/:restaurantId/review/:reviewId', authController.authMiddleWare, reviewsController.updateReview);

/** 리뷰 삭제 **/
router.delete('/:restaurantId/review/:reviewId', authController.authMiddleWare, reviewsController.deleteReview);

export default router;

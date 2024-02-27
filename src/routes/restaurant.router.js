// 라우팅 설정 및 컨트롤러 연결

import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { RestaurantsController } from '../controllers/restaurant.controller.js';
import { RestaurantsServices } from '../services/restaurant.service.js';
import { RestaurantsRepositories } from '../repositories/restaurant.repository.js';
import { AuthController } from '../middlewares/auth/auth.middleware.controller.js';
import { AuthService } from '../middlewares/auth/auth.middleware.service.js';
const router = express.Router();

// 3계층의 의존성을 모두 주입한다.
const restaurantsRepository = new RestaurantsRepositories(prisma);
const restaurantsService = new RestaurantsServices(restaurantsRepository);
const restaurantController = new RestaurantsController(restaurantsService);

// AuthController 인스턴스 생성.
const authService = new AuthService(restaurantsRepository);
const authController = new AuthController(authService);

// API 요청 라우팅 설정

/* 배달 완료 기능 | 사장님 */
router.patch(
    '/restaurant/:restaurantId/order/:orderId',
    authController.authMiddleware,
    restaurantController.updateDeliveryStatus
);

/* 메뉴 주문 기능 | 고객님 */
router.post('/restaurant/:restaurantId/order', authController.authMiddleware, restaurantController.orderMenu);

/* 리뷰 생성 | 고객님 */
router.post('/restaurant/:restaurantId/review', authController.authMiddleware, restaurantController.createReview);

/* 리뷰 리스트 조회 | 사용자 */
router.get('/restaurant/:restaurantId/review', authController.authMiddleware, restaurantController.getReviewList);

/* 리뷰 세부사항 조회 | 사용자 */
router.get(
    '/restaurant/:restaurantId/review/:reviewId',
    authController.authMiddleware,
    restaurantController.getReviewDetail
);

/* 리뷰 수정 | 고객님 */
router.patch(
    '/restaurant/:restaurantId/review/:reviewId',
    authController.authMiddleware,
    restaurantsController.updateReview
);

/* 리뷰 및 평점 삭제 | 고객님 */

router.delete('/restaurant/:restaurantId/review', authController.authMiddleware, restaurantsController.deleteReview);

export default router;

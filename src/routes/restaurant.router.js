// 라우팅 설정 및 컨트롤러 연결

import express from 'express';
// authMiddleware import 임시 코드
// 둘 중 어떤 걸 사용해야 할까? -> 둘 다
import authMiddleware from '../middlewares/auth/auth.middleware.controller.js';
import authMiddleware from '../middlewares/auth/auth.middleware.service.js';

// User 요청 처리 컨트롤러 불러오기
const { RestaurantController } = require('../controllers/restaurant.controller.js');

const router = express.Router();

// RestaurantController의 인스턴스를 생성한다.
const restaurantController = new RestaurantController();

// 모든 API 요청 URL에 대해서 /api 하위로 작성해주기 위해서는 미들웨어를 사용해줘야 하지 않을까? 🤔

// API 요청 라우팅 설정

/* 배달 완료 기능 | 사장님 */

router.patch('/api/restaurant/:restaurantId/order/:orderId', authMiddleware, restaurantController.deliveryDone);

/* 메뉴 주문 기능 | 고객님 */

router.post('/api/restaurant/:restaurantId/order', authMiddleware, restaurantController.orderMenu);

/* 리뷰 및 평점 생성 | 고객님 */

router.post('/api/restaurant/:restaurantId/review', authMiddleware, restaurantController.createReview);

/* 리뷰 및 평점 조회 | 고객님 */

router.get('/api/restaurant/:restaurantId/review', authMiddleware, restaurantController.getReviews);

/* 리뷰 및 평점 수정 | 고객님 */

router.patch('/api/restaurant/:restaurantId/review/:reviewId', authMiddleware, restaurantController.updateReview);

/* 리뷰 및 평점 삭제 | 고객님 */

router.delete('/api/restaurant/:restaurantId/review', authMiddleware, restaurantController.deleteReview);

export default router;

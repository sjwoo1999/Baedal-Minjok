// Service와 Repository를 연결하여 요청 처리
// 5.4 Layered Architecture Pattern - Controller
// 인증 관련 코드는 Controller에서만 작성하도록 한다.

import { RestaurantService } from '../services/restaurant.service.js';

// User의 컨트롤러(Controller) 역할을 하는 클래스
export class RestaurantsController {
    restaurantService = new RestaurantService(); // Restaurant 서비스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    // 배달 완료 | 사장님
    deliveryDone = async (req, res, next) => {
        try {
            // 서비스 계층에 구현된 deliveryDone 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.

            // 배달 완료 로직
            // orderdetail에 접근하고, orderID를 타고 order으로 이동하여 status에 접근한다.

            return res.status(returnCode).json(JSON);
        } catch (err) {
            next(err);
        }
    };

    // 메뉴 주문 | 고객님
    orderMenu = async (req, res, next) => {
        try {
            const { userId, restaurantId, deliveryType, status, totPrice, orderTime } = req.body;

            // 서비스 계층에 구현된 orderMenu 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.

            // 메뉴 주문 로직
            // 1. 입력받은 req의 내용을 가진 json을 사용자가 가져야 한다. -> 맞는 논리인지 확인 필요
            // 2. 입력받은 req의 내용을 가진 json을 업주가 가져야 한다. -> 맞는 논리인지 확인 필요

            // 서비스로 보내줄 애들~
            // body나 parmas에 적었냐 안 적었냐?
            // 이런 애들이 서비스에 들어가서 작업을 해도 되는지?
            // 형태 확인해준다 ~

            return res.status(returnCode).json(JSON);
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 생성 | 고객님
    createReview = async (req, res, next) => {
        try {
            const { userId, restaurantId, content, rate } = req.body;

            // 서비스 계층에 구현된 createReview 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 생성 로직
            const createdReview = await this.RestaurantService.createReview(userId, restaurantId, content, rate);

            return res.status(201).json({ data: createdReview });
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 조회 | 고객님
    getReviews = async (req, res, next) => {
        try {
            // 서비스 계층에 구현된 getReviews 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 조회 로직

            return res.status(returnCode).json(JSON);
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 수정 | 고객님
    updateReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { userId, restaurantId, content, rate } = req.body;
            // 서비스 계층에 구현된 updateReview 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 수정 로직
            const updatedReview = await this.RestaurantService.updateReview(userId, restaurant, content, rate);

            return res.status(200).json({ data: updatedReview });
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 삭제 | 고객님
    // 수정이 필요할 듯?
    deleteReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { userId, restaurantId } = req.body;
            // 서비스 계층에 구현된 deleteReview 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 삭제 로직

            const deletedReview = await this.RestaurantService.deleteReview(userId, restaurantId);

            return res.status(200).json({ data: deletedReview });
        } catch (err) {
            next(err);
        }
    };
}

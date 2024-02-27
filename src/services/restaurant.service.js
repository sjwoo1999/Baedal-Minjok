// 비즈니스 로직 구현
// 5.5 Layered Architecture Pattern - Service
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RestaurantsRepository } from '../repositories/restaurant.repository.js';

// 생성자 작성 필요

export class RestaurantsService {
    // 생성자 작성 필요
    // 테스트 하기 위해 이런 식으로 작성 ~
    // 의존성 주입을 위함 ~
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    updateDeliveryStatus = async (status) => {
        return { json };
    };

    orderMenu = async () => {
        return { json };
    };

    createdReview = async (userId, restaurant, content, rate) => {
        return { json };
    };

    getReviewDetail = async (restaurantId, reviewId) => {
        return { json };
    };

    updateReview = async (userId, restaurantId, revieId, updatedData) => {
        return { json };
    };

    deleteReview = async (userId, restaurantId, reviewId, password) => {
        return { json };
    };

    /*
    // 이것저것 주석
    // 이거 왜 작성했는지 파악해야 함 : 필요 없다면 지워야 함
    // new 같은 경우 .. 경로로 받아온 다음에 instance 생성 ..
    // 이런 경우 ctrl + 클릭 -> 연결 가능 .. 직접적으로 연결 ~
    // restaurantRepository = new RestaurantRepository();


    // PATCH
    deliveryDone = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // Restaurant이 갖고 있는 주문 목록에 들어가서 주문 상태에 접근하도록 해야 한다.

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { json };
    };

    // POST 여기 매개변수 수정해줘야 함
    orderMenu = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // Restaurant가 갖고 있는 주문 목록에 들어가서 주문 상태에 접근하도록 해야 한다.
        const orderedMenu = await RestaurantRepository.orderMenu(
            userId,
            restaurantId,
            deliveryType,
            status,
            // status는 사용되지 않습니다? -> 이거 여쭤봐야 함
            totPrice,
            orderTime
        );

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다. (완료)
        return {
            userId: orderedMenu.userId,
            restaurantId: orderedMenu.restaurantId,
            deliveryType: orderedMenu.deliveryType,
            status: orderedMenu.status,
            totPrice: orderedMenu.totPrice,
            orderTime: orderedMenu.orderTime,
            createdAt: orderedMenu.createdAt,
            updatedAt: orderedMenu.updatedAt,
        };
    };

    // POST
    createReview = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // Restaurant가 갖고 있는 리뷰 목록에 리뷰를 작성할 수 있도록 해야 한다.
        const createdReview = await this.RestaurantRepository.createReview(userId, restaurantId, content, rate);

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return {
            userId: createdReview.userId,
            restaurantId: createdReview.restaurantId,
            content: createdReview.content,
            rate: createdReview.rate,
            createdAt: createdReview.createdAt,
            updatedAt: createdReview.updatedAt,
        };
    };

    // GET
    getReviews = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // Restaurant가 갖고 있는 리뷰 목록을 조회할 수 있도록 해야 한다.

        // 리뷰 목록 조회 - 리뷰 상세 조회 - 이거 아직 구분이 안 된 거 같은데?

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { json };
    };

    // PATCH
    updateReview = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // req에서 전달받은 리뷰 id에 해당하는 리뷰에 접근하고 수정할 수 있도록 해야 한다.

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { json };
    };

    // DELETE
    deleteReview = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // req에서 전달받은 리뷰 id에 해당하는 리뷰에 접근하고 삭제할 수 있도록 해야 한다.

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { json };
    };
    */
}

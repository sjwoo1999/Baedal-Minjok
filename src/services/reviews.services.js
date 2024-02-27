import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ReviewsRepository } from '../repositories/reviews.repository.js';

export class ReviewsServices {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

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

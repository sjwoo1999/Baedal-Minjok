import bcrypt from 'bcrypt';
import { InconsistencyError } from '../utils/err/err.js';
export class ReviewsServices {
    constructor(reviewsRepository, usersRepository, restaurantRepository) {
        this.reviewsRepository = reviewsRepository;
        this.usersRepository = usersRepository;
        this.restaurantRepository = restaurantRepository;
    }

    // 리뷰 생성
    createReview = async (id, restaurantId, content, rate) => {
        await this.reviewsRepository.createReview(id, restaurantId, content, rate);
    };

    // 리뷰리스트조회
    findReviewList = async (restaurantId) => {
        const reviewList = await this.reviewsRepository.findReviewList(restaurantId);

        return reviewList;
    };

    // 리뷰 상세 조회
    findOneReview = async (restaurantId, reviewId) => {
        const review = await this.reviewsRepository.findReviewByReviewId(restaurantId, reviewId);

        return review;
    };

    // 리뷰 업데이트
    updateReview = async (userId, restaurantId, reviewId, updatedData) => {
        await this.reviewsRepository.updateReview(userId, restaurantId, reviewId, updatedData);
    };

    // 리뷰 삭제
    deleteReview = async (userId, restaurantId, reviewId, password) => {
        const user = await this.usersRepository.findById(userId);

        const comparison = await bcrypt.compare(password, user.password);

        // 에러 클래스 미들웨어 사용해보기
        if (!comparison) {
            throw new InconsistencyError('자신의 리뷰만 삭제가 가능합니다.');
        }

        await this.reviewsRepository.deleteReview(restaurantId, reviewId);
    };
}

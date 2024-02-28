import bcrypt from 'bcrypt';

export class ReviewsServices {
    constructor(reviewsRepository, usersRepository, restaurantRepository) {
        this.reviewsRepository = reviewsRepository;
        this.usersRepository = usersRepository;
        this.restaurantRepository = restaurantRepository;
    }

    createReview = async (id, restaurantId, content, rate) => {
        await this.reviewsRepository.createReview(id, restaurantId, content, rate);
    };

    findReviewList = async (restaurantId) => {
        const reviewList = await this.reviewsRepository.findReviewList(restaurantId);

        return reviewList;
    };

    findOneReview = async (restaurantId, reviewId) => {
        const review = await this.reviewsRepository.findReviewByReviewId(restaurantId, reviewId);

        return review;
    };

    updateReview = async (userId, restaurantId, reviewId, updatedData) => {
        await this.reviewsRepository.updateReview(userId, restaurantId, reviewId, updatedData);
    };

    deleteReview = async (userId, restaurantId, reviewId, password) => {
        const user = await this.usersRepository.findById(userId);

        const comparison = await bcrypt.compare(password, user.password);

        // 에러 클래스 미들웨어 사용해보기
        if (!comparison) {
            throw { code: 400, message: '자신의 리뷰만 삭제가 가능합니다.' };
        }

        await this.reviewsRepository.deleteReview(restaurantId, reviewId);
    };
}

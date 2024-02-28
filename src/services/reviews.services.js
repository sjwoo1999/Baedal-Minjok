export class ReviewsServices {
    constructor(reviewsRepository, usersRepository, restaurantRepository) {
        this.reviewsRepository = reviewsRepository;
        this.usersRepository = usersRepository;
        this.restaurantRepository = restaurantRepository;
    }

    createReview = async (id, restaurantId, content, rate) => {
        // const validation = await this.usersRepository.isGuest(userId);

        // if (!validation) {
        //     throw { code: 400, message: '사장님은 리뷰를 작성할 수 없습니다!' };
        // }

        await this.reviewsRepository.createReview(id, restaurantId, content, rate);
    };

    findOneReview = async (restaurantId, reviewId) => {
        if (!restaurantId) throw { code: 400, message: '올바르지 않은 식당 코드입니다!' };
        const review = await this.reviewsRepository.findReviewByReviewId(reviewId);

        return review;
    };

    updateReview = async (userId, restaurantId, reviewId, update) => {
        const validation = await this.usersRepository.isGuest(userId);
        if (!validation) {
            throw { code: 400, message: '사장님은 리뷰를 수정할 수 없습니다!' };
        }

        const comparsion = await this.usersRepository.comparePassword(userId, password);
        if (!comparision) {
            throw { code: 400, message: '권한이 없는 사용자입니다!' };
        }

        const review = await this.reviewsRepository.updateReview(restaurantId, reviewId, updatedData);

        return review;
    };

    deleteReview = async (userId, restaurantId, reviewId, password) => {
        const validation = await this.usersRepository.isGuest(userId);
        if (!validation) {
            throw { code: 400, message: '사장님은 리뷰를 수정할 수 없습니다!' };
        }

        const comparsion = await this.usersRepository.comparePassword(userId, password);
        if (!comparision) {
            throw { code: 400, message: '권한이 없는 사용자입니다!' };
        }

        const review = await this.reviewsRepository.deleteReview(restaurantId, reviewId);

        return review;
    };
}

export class ReviewsRepositoriy {
    // 프리즈마 생성자 생성
    constructor(prisma) {
        this.prisma = prisma;
    }

    // POST
    createReview = async (userId, restaurantId, content, rate) => {
        // 저장소(Repository)에게 데이터를 요청합니다??
        const createdReview = await prisma.Comment.createReview({
            data: {
                userId,
                restaurantId,
                content,
                rate,
            },
        });

        return createdReview;
    };

    // GET
    getReviews = async () => {};

    // PATCH
    updateReview = async () => {
        // 저장소(Repository)에게 특정 식당 하나를 요청합니다.
        const restaurant = await this.RestaurantsRepository.getReviews();
    };

    // DELETE
    deleteReview = async () => {
        // 저장소(Repository)에게 특정 식당 하나를 요청합니다.
    };
}

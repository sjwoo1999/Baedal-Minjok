export class ReviewsRepository {
    // 프리즈마 생성자 생성
    constructor(prisma) {
        this.prisma = prisma;
    }

    createReview = async (id, restaurantId, content, rate) => {
        await this.prisma.Reviews.create({
            data: {
                userId: +id,
                restaurantId: +restaurantId,
                content,
                rate: +rate,
            },
        });
    };

    findReviewByReviewId = async (restaurantId, reviewId) => {
        const review = await this.prisma.Reviews.findFirst({
            where: {
                restaurantId: +restaurantId,
                id: +reviewId,
            },
            select: {
                id: true,
                restaurantId: true,
                content: true,
                rate: true,
            },
        });

        return review;
    };

    updateReview = async (userId, restaurantId, reviewId, updatedData) => {
        await this.prisma.Reviews.update({
            where: {
                id: +reviewId,
                restaurantId: +restaurantId,
                userId: +userId,
            },
            data: {
                ...updatedData,
            },
        });
    };

    deleteReview = async (restaurantId, reviewId) => {
        const deleteReview = await this.prisma.Reviews.delete({
            where: {
                id: +reviewId,
                restaurantId: +restaurantId,
            },
        });

        return deleteReview;
    };
}

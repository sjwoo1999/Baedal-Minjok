export class ReviewsRepository {
    // 프리즈마 생성자 생성
    constructor(prisma) {
        this.prisma = prisma;
    }

    createReview = async (userId, restaurantId, content, rate) => {
        await this.prisma.Reviews.create({
            data: {
                userId: +userId,
                restaurantId: +restaurantId,
                content,
                rate,
            },
        });
    };

    findReviewByReviewId = async (restaurantId, reviewId) => {
        const review = await this.prisma.Reviews.findFirst({
            where: {
                restaurantId: +restaurant,
                reviewId: +reviewId,
            },
            select: {
                restaurantId: true,
                reviewId: true,
                content: true,
                rate: true,
            },
        });

        return review;
    };

    updateReview = async (restaurantId, reviewId, updatedData) => {
        const updatedReview = await this.prisma.Reviews.update({
            where: {
                id: +reviewId,
                restaurantId: +restaurantId,
            },
            data: {
                ...updatedata,
            },
        });

        return updatedReview;
    };

    deleteReview = async (restaurantId, reviewId) => {
        const deleteReview = await this.prisma.Reviews.delete({
            where: {
                id: +reviewId,
                restaurantId: +restaurantId,
            },
        });

        return deletedReview;
    };
}

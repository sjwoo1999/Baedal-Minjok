// 데이터 접근 및 조작
// 5.6 Layered Architecture Pattern - Repository
import { prisma } from '../utils/prisma/index.js';

export class RestaurantsRepository {
    // PATCH
    deliveryDone = async () => {};

    // POST
    orderMenu = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다??
        const orderedMenu = await prisma.Order.orderMenu({
            data: {
                userId,
                restaurantId,
                delieveryType,
                status,
                totPrice,
                orderTime,
            },
        });
    };

    // POST
    createReview = async () => {
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

export class ReviewsController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }

    /** 리뷰 생성 | 고객님 **/
    createReview = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { content, rate } = req.body;
            const { id } = req.user;

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId) return res.status(400).json({ message: '접근할 식당이 올바르게 선택되지 않았습니다!' });

            await this.reviewService.createReview(id, restaurantId, content, rate);

            return res.status(201).json({ message: '리뷰가 정상적으로 등록되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    /** 리뷰 목록 조회 | 사용자 **/
    // 임시로 추가해두긴 했는데, 시간 부족하면 일단 제외해도 상관없을 듯
    // 일단 접어둠

    getReviewList = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId) {
                return res.status(400).json({ message: '접근할 식당이 올바르게 선택되지 않았습니다!' });
            }

            const reviewList = await this.reviewService.findReviewList(restaurantId);

            return res.status(200).json({ reviewList });
        } catch (err) {
            next(err);
        }
    };

    /** 리뷰 상세 조회 | 사용자 **/
    /* 
        /api/restaurant/:restaurantId/review/:reviewId
    */
    getReviewDetail = async (req, res, next) => {
        try {
            const { restaurantId, reviewId } = req.params;

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId) {
                return res.status(400).json({ message: '접근할 식당이 올바르게 선택되지 않았습니다!' });
            }

            if (!reviewId) {
                return res.status(400).json({ message: '접근할 리뷰가 올바르게 선택되지 않았습니다!' });
            }

            const review = await this.reviewService.findOneReview(restaurantId, reviewId);

            return res.status(200).json({ review });
        } catch (err) {
            next(err);
        }
    };

    /** 리뷰 수정 | 고객님 **/
    /* 
            /api/restaurant/:restaurantId/review/:reviewId
        */
    updateReview = async (req, res, next) => {
        try {
            const { restaurantId, reviewId } = req.params;
            const updatedData = req.body;
            const { id } = req.user; // 그래도 일단 넣자

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId) return res.status(400).json({ message: '접근할 식당이 올바르게 선택되지 않았습니다!' });

            if (!reviewId) return res.status(400).json({ message: '접근할 리뷰가 올바르게 선택되지 않았습니다!' });

            await this.reviewService.updateReview(id, restaurantId, reviewId, updatedData);

            return res.status(201).json({ message: '리뷰 수정에 성공하였습니다.' });
        } catch (err) {
            next(err);
        }
    };

    /** 리뷰 삭제 | 고객님 **/
    /* 
        /api/restaurant/:restaurant/review/:reviewId
    */
    deleteReview = async (req, res, next) => {
        try {
            const { restaurantId, reviewId } = req.params;
            const { password } = req.body;
            const { id } = req.user;

            // 필요한 요소들 입력했는지 확인
            if (!restaurantId) return res.status(401).json({ message: '접근할 식당이 올바르게 선택되지 않았습니다!' });

            if (!reviewId) return res.status(401).json({ message: '접근할 리뷰가 올바르게 선택되지 않았습니다!' });

            if (!password) return res.status(401).json({ message: '비밀번호가 올바르게 입력되지 않았습니다!' });

            await this.reviewService.deleteReview(id, restaurantId, reviewId, password);

            return res.status(201).json({ message: '리뷰가 삭제되었습니다!' });
        } catch (err) {
            next(err);
        }
    };
}

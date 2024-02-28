export class ReviewsController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }

    /** 리뷰 생성 | 고객님 **/
    /* 
        /api/restaurant/:restaurantId/review
    */
    createReview = async (req, res, next) => {
        try {
            const { restaurantId } = req.params;
            const { content, rate } = req.body;
            const { id } = req.user;

            if (!restaurantId) return res.status(400).json({ message: '존재하지 않는 식당입니다!' });

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
            const {} = req.body;

            // 리뷰 목록이 존재하는지 아닌지에 대해 유효성 검사 어떻게 해야 할까?

            // 고객님인지 사장님인지 파악해서 분기 처리

            // 고객님이라면 지금까지 작성한 모든 리뷰 리스트를 반환한다. (식당 무관)

            // 사장님이라면 지금까지 해당 식당에 작성된 모든 리뷰 리스트를 반환한다.

            return res.status(RETURN_CODE).json({ JSON });
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
            // req.params | URL 경로에 포함된 파라미터
            // req.body | HTTP 요청 본문에 포함된 데이터
            // req.user | 로그인된 사용자 정보

            const { restaurantId, reviewId } = req.params;
            // const {} = req.body; | 딱히 전달할 건 없을 듯

            // 리뷰볼 레스토랑 선택 안함?
            if (!restaurantId) {
                return res.status(400).json({ message: '식당선택이 되지 않았습니다.' });
            }

            // 리뷰 볼 번호를 안정함.
            if (!reviewId) {
                return res.status(400).json({ message: '조회할 리뷰를 선택 안했습니다.' });
            }

            // 고객님이든 사장님이든 둘 다 상관 없으니 따로 작업할 건 없음
            // 전달받은 리뷰 id를 통해 리뷰에 접근하고, 해당 리뷰를 반환한다.

            const review = await this.reviewService.findOneReview(restaurantId, reviewId);
            // review id .. auto increment?
            // 어떤 걸 기준으로 하느냐에 따라서 restaurantId와 reviewId 두 개 모두를 매개변수로 전달할 수도 있고,
            // reviewId 하나만 매개변수로 전달하는 경우도 발생할 수 있다.

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
            // req.params | URL 경로에 포함된 파라미터
            // req.body | HTTP 요청 본문에 포함된 데이터
            // req.user | 로그인된 사용자 정보

            const { restaurantId, reviewId } = req.params;
            const updatedData = req.body;
            // userId는 authMiddleware를 통해 값을 가져오고 있기 때문에 빼줘도 상관 없을 거 같은데?
            const { id } = req.user; // 그래도 일단 넣자

            // 어느곳의 리뷰를 수정하는가?
            if (!restaurantId) return res.status(400).json({ message: '수정할 리뷰의 식당을 선택하지 않았습니다.' });
            // 어느곳의 어떤 리뷰 수정하는가?
            if (!reviewId) return res.status(400).json({ message: '리뷰를 선택하지 않았습니다.' });

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
            // req.params | URL 경로에 포함된 파라미터
            // req.body | HTTP 요청 본문에 포함된 데이터
            // req.user | 로그인된 사용자 정보

            const { restaurantId, reviewId } = req.params;
            const { password } = req.body;
            const { id } = req.user;

            // 메시지 수정 해주세여!
            // 식당이 존재하는가?
            if (!restaurantId) return res.status(401).json({ message: '존재하지 않는 식당입니다!' });
            // 리뷰가 존재하는가?
            if (!reviewId) return res.status(401).json({ message: '존재하지 않는 리뷰입니다!' });
            // 올바른 비밀번호인가?
            if (!password) return res.status(401).json({ message: '비밀번호를 잘못 입력하셨습니다!' });

            await this.reviewService.deleteReview(id, restaurantId, reviewId, password);

            return res.status(201).json({ message: '리뷰 삭제에 성공하였습니다!' });
        } catch (err) {
            next(err);
        }
    };
}

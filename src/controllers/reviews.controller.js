export class ReviewsController {
    constructor(reviewsController) {
        this.reviewsController = reviewsController;
    }

    /** 리뷰 생성 | 고객님 **/
    /* 
        /api/restaurant/:restaurantId/review
    */
    createReview = async (req, res, next) => {
        try {
            // req.params | URL 경로에 포함된 파라미터
            // req.body | HTTP 요청 본문에 포함된 데이터
            // req.user | 로그인된 사용자 정보

            const { restaurantId } = req.params;
            const { content, rate } = req.body;
            const userId = req.user;
            const type = req.type;

            // 사용자가 존재하는지 확인한다.
            // 아니라면 작업 중단.
            if (!userId) return res.status(400).json({ message: '로그인 여부를 다시 확인해주세요.' });

            // 식당이 존재하는지 확인한다.
            // 아니라면 작업 중단.
            if (!restaurantId) return res.status(400).json({ message: '존재하지 않는 식당입니다!' });

            // 사용자가 고객님인지 확인한다.
            // 아니라면 작업 중단.
            if (type !== 'GUEST') {
                // 에러 코드 체크해봐야 한다.
                return res.status(400).json({
                    errMessage: '해당 작업을 수행할 권한이 없습니다!',
                });
            }

            // reviewService로 나중에 바꿔줘야 하지 않을까?
            // 로직은 서비스에서 구현하도록 한다.
            // 서비스에서 구현한 함수를 호출할 수 있도록 한다.
            const review = await this.restaurantService.newReview(userId, restaurantId, content, rate);

            // 반환 코드 체크해야 한다.
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
            const userId = req.user;
            const type = req.type;

            // 존재하는 식당인가?

            if (!restaurantId) {
                return res.status(400).json({ message: '존재하지 않는 식당입니다!' });
            }

            // 존재하는 리뷰인가?

            if (!reviewId) {
                return res.status(400).json({ message: '존재하지 않는 리뷰입니다!' });
            }

            // 고객님이든 사장님이든 둘 다 상관 없으니 따로 작업할 건 없음
            // 전달받은 리뷰 id를 통해 리뷰에 접근하고, 해당 리뷰를 반환한다.

            const review = await this.restaurantService.findOneReview(restaurantId, reviewId);
            // review id .. auto increment?
            // 어떤 걸 기준으로 하느냐에 따라서 restaurantId와 reviewId 두 개 모두를 매개변수로 전달할 수도 있고,
            // reviewId 하나만 매개변수로 전달하는 경우도 발생할 수 있다.

            return res.status(200).json(review);
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
            const userId = req.user; // 그래도 일단 넣자
            const type = req.type;

            // 사용자가 존재하는가?
            if (!userId) return res.status(400).json({ message: '로그인 여부를 다시 확인해주세요!' });
            // 식당이 존재하는가?
            if (!restaurantId) return res.status(400).json({ message: '존재하지 않는 식당입니다!' });
            // 리뷰가 존재하는가?
            if (!reviewId) return res.status(400).json({ message: '존재하지 않는 리뷰입니다!' });

            // 사용자가 고객님인지 확인한다.
            // 아니라면 작업 중단.
            if (type !== 'GUEST') {
                // 에러 코드 체크해봐야 한다.
                return res.status(400).json({
                    errMessage: '해당 작업을 수행할 권한이 없습니다!',
                });
            }

            // 현재 고객님이 리뷰를 작성한 고객님인지 확인한다.
            // 아니라면 작업 중단.

            await this.restaurantService.updateReview(userId, restaurantId, reviewId, updatedData);

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
            const password = req.body; // 잘 모르겠는데 일단 작성해두자
            // const {} = req.body; | 딱히 전달할 건 없을 듯
            const userId = req.user;
            const type = req.type;

            // 사용자가 존재하는가?
            if (!userId) return res.status(400).json({ message: '로그인 여부를 다시 확인해주세요!' });
            // 식당이 존재하는가?
            if (!restaurantId) return res.status(401).json({ message: '존재하지 않는 식당입니다!' });
            // 리뷰가 존재하는가?
            if (!reviewId) return res.status(401).json({ message: '존재하지 않는 리뷰입니다!' });
            // 올바른 비밀번호인가?
            if (!password) return res.status(401).json({ message: '비밀번호를 잘못 입력하셨습니다!' });

            // 사용자가 고객님인지 확인한다.
            // 아니라면 작업 중단.
            if (type !== 'GUEST') {
                // 에러 코드 체크해봐야 한다.
                return res.status(400).json({
                    errMessage: '해당 작업을 수행할 권한이 없습니다!',
                });
            }

            // 현재 고객님이 리뷰를 작성한 고객님인지 확인한다.
            // 아니라면 작업 중단.

            await this.restaurantService.deleteReview(userId, restaurantId, reviewId, password);

            return res.status(201).json({ message: '리뷰 삭제에 성공하였습니다!' });
        } catch (err) {
            next(err);
        }
    };
}

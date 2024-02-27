// Service와 Repository를 연결하여 요청 처리
// 5.4 Layered Architecture Pattern - Controller
// 인증 관련 코드는 Controller에서만 작성하도록 한다

// User의 컨트롤러(Controller) 역할을 하는 클래스
export class RestaurantsController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }

    /** 배달 완료 | 사장님 **/
    /*
        /api/restaurant/:restaurantId/order/:orderId
    */
    updateDeliveryStatus = async (req, res, next) => {
        try {
            // req.params | URL 경로에 포함된 파라미터
            // req.body | HTTP 요청 본문에 포함된 데이터
            // req.user | 로그인된 사용자 정보

            const { restaurantId, orderId } = req.params;
            const { status } = req.body;
            const userId = req.user;
            const type = req.type;

            // 식당 id 또는 주문 id가 존재하지 않는다면 반환한다.
            if (!restaurantId || !orderId) {
                // 에러 코드 체크해봐야 한다.
                return res.status(404).json({
                    errMessage: '올바르지 않은 주문입니다!',
                });
            }

            // 사용자가 존재하는지 확인한다.
            // 아니라면 작업 중단.
            if (!userId) return res.status(400).json({ message: '로그인 여부를 다시 확인해주세요.' });

            // 사용자가 사장님인지 파악한다.
            // 아니라면 작업 중단.
            if (type !== 'OWNER') {
                // 에러 코드 체크해봐야 한다.
                return res.status(400).json({
                    errMessage: '해당 작업을 수행할 권한이 없습니다!',
                });
            }

            // 전달받은 주문 id를 통해 주문에 접근하고, 주문의 status를 변경해주도록 한다.

            // 주문이 존재하는지 확인한다.
            if (!orderId) return res.status(401).json({ message: '존재하지 않는 주문입니다!' });

            await this.restaurantService.updateStatus(orderId);

            // 변경된 이후의 주문 내역을 다시 반환한다.
            // 반환 코드 체크해봐야 한다.
            return res.status(201).json({ message: `배달이 완료되었습니다.` });
        } catch (err) {
            next(err);
        }
    };

    // 1:N 관계? 이거 확인해봐야 할 듯
    // 🤔 🤨 🧐

    /** 메뉴 주문 | 고객님 **/
    /* 
        /api/restaurant/:restaurantId/order
    */
    orderMenu = async (req, res, next) => {
        try {
            // req.params | URL 경로에 포함된 파라미터
            // req.body | HTTP 요청 본문에 포함된 데이터
            // req.user | 로그인된 사용자 정보

            const { restaurantId } = req.params;
            const {} = req.body;
            const userId = req.user;
            const type = req.type;

            // 사용자가 존재하는지 확인한다.
            // 아니라면 작업 중단.
            if (!userId) return res.status(400).json({ message: '로그인 여부를 다시 확인해주세요.' });

            // 사용자가 고객님인지 확인한다.
            // 아니라면 작업 중단.
            if (type !== 'GUEST') {
                // 에러 코드 체크해봐야 한다.
                return res.status(400).json({
                    errMessage: '해당 작업을 수행할 권한이 없습니다!',
                });
            }

            // ⭐️⭐️⭐️⭐️⭐️
            // 로직은 서비스에서 구현하도록 한다.
            // 서비스에서 구현한 함수를 호출할 수 있도록 한다.
            // ⭐️⭐️⭐️⭐️⭐️

            // 반환 코드 체크해야 한다.
            return res.status(201).json({ message: `${orderId}번 주문이 완료되었습니다.` });
        } catch (err) {
            next(err);
        }
    };

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

    /*
    // 배달 완료 | 사장님
    deliveryDone = async (req, res, next) => {
        try {
            // 서비스 계층에 구현된 deliveryDone 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.

            // 배달 완료 로직
            // orderdetail에 접근하고, orderID를 타고 order으로 이동하여 status에 접근한다.

            return res.status(returnCode).json(JSON);
        } catch (err) {
            next(err);
        }
    };

    // 메뉴 주문 | 고객님
    orderMenu = async (req, res, next) => {
        try {
            const { userId, restaurantId, deliveryType, status, totPrice, orderTime } = req.body;

            // 서비스 계층에 구현된 orderMenu 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.

            // 메뉴 주문 로직
            // 1. 입력받은 req의 내용을 가진 json을 사용자가 가져야 한다. -> 맞는 논리인지 확인 필요
            // 2. 입력받은 req의 내용을 가진 json을 업주가 가져야 한다. -> 맞는 논리인지 확인 필요

            // 서비스로 보내줄 애들~
            // body나 parmas에 적었냐 안 적었냐?
            // 이런 애들이 서비스에 들어가서 작업을 해도 되는지?
            // 형태 확인해준다 ~

            return res.status(returnCode).json(JSON);
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 생성 | 고객님
    createReview = async (req, res, next) => {
        try {
            const { userId, restaurantId, content, rate } = req.body;

            // 서비스 계층에 구현된 createReview 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 생성 로직
            const createdReview = await this.RestaurantService.createReview(userId, restaurantId, content, rate);

            return res.status(201).json({ data: createdReview });
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 조회 | 고객님
    getReviews = async (req, res, next) => {
        try {
            // 서비스 계층에 구현된 getReviews 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 조회 로직

            return res.status(returnCode).json(JSON);
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 수정 | 고객님
    updateReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { userId, restaurantId, content, rate } = req.body;
            // 서비스 계층에 구현된 updateReview 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 수정 로직
            const updatedReview = await this.RestaurantService.updateReview(userId, restaurant, content, rate);

            return res.status(200).json({ data: updatedReview });
        } catch (err) {
            next(err);
        }
    };

    // 리뷰 및 평점 삭제 | 고객님
    // 수정이 필요할 듯?
    deleteReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { userId, restaurantId } = req.body;
            // 서비스 계층에 구현된 deleteReview 로직을 수행합니다.
            // 요청 값(req) json을 작성해준다.
            // 리뷰 및 평점 삭제 로직

            const deletedReview = await this.RestaurantService.deleteReview(userId, restaurantId);

            return res.status(200).json({ data: deletedReview });
        } catch (err) {
            next(err);
        }
    };
    */
}

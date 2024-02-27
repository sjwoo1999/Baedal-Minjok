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

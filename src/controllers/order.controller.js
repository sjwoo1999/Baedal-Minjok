export class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    // totPrice는 req에 orderdetail 값으로 들어온 수량과 메뉴의 가격으로 정할수 있음
    order = async (req, res, next) => {
        try {
            // 인증 미들웨어 거쳐서 아이디 받아옴
            const { id, type } = req.user;
            const { restaurantId } = req.params;
            // 요청들어온 body에서 restaurantId, deliveryType, status,[{메뉴번호와, 메뉴 수량 * a}]

            const { deliveryType, status, item } = req.body;

            if (type === 'OWNER') {
                throw new Error('사장님은 메뉴를 주문할수 없습니다.');
            }

            if (!(restaurantId || deliveryType || status || item)) {
                return res.status(400).json({ errorMessage: '필수항목을 채워주세요' });
            }

            await this.orderService.order(id, restaurantId, deliveryType, status, item);

            return res.status(200).json({ successMessage: '결제에 성공하였습니다.' });
        } catch (err) {
            next(err);
        }
    };
}

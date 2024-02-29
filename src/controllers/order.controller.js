export class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    // totPrice는 req에 orderDetail 값으로 들어온 수량과 메뉴의 가격으로 정할수 있음
    order = async (req, res, next) => {
        try {
            // 인증 미들웨어 거쳐서 아이디 받아옴
            const { id, type } = req.user;
            const { restaurantId } = req.params;

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

    /* 사장이 매장의 주문 확인하는 메서드 */
    ownerGetOrders = async (req, res, next) => {
        try {
            const { id, type } = req.user;
            const { restaurantId } = req.params;

            // 유저 타입이 사장인지 판별
            if (type !== 'OWNER') {
                return res.status(400).json({ errorMessage: '사장만 할 수 있는 기능입니다.' });
            }

            if (!restaurantId) {
                return res.status(400).json({ errorMessage: '레스토랑 아이디를 작성하세요.' });
            }

            const checkOrder = await this.orderService.checkOrder(id, restaurantId);

            if (!checkOrder) {
                return res.status(400).json({ errorMessage: '현재 주문 내역이 존재하지 않습니다.' });
            }

            return res.status(200).json({ data: checkOrder });
        } catch (err) {
            next(err);
        }
    };

    /* 고객이 자기 주문 확인하는 메서드 */
    guestGetOrder = async (req, res, next) => {
        try {
            const { id } = req.user;

            const orders = await this.orderService.findOrders(id);

            if (!orders) {
                return res.status(400).json({ errorMessage: '현재 주문 내역이 존재하지 않습니다.' });
            }

            return res.status(200).json({ data: orders });
        } catch (err) {
            next(err);
        }
    };

    /* 사장이나 그 주문을 주문한 고객이 주문 1개를 확인하는 메서드 */
    getOneOrder = async (req, res, next) => {
        try {
            const { id } = req.user;
            const { orderId } = req.params;

            if (!orderId) {
                return res.status(400).json({ errorMessage: '찾으려는 주문 아이디를 입력하세요.' });
            }

            const order = await this.orderService.findOneOrder(id, orderId);

            order.totalPrice = order.totalPrice.toString();
            return res.status(200).json({ data: order });
        } catch (err) {
            next(err);
        }
    };

    // 주문상태 업데이트
    updateDelivery = async (req, res, next) => {
        try {
            const { id, type } = req.user;
            const { restaurantId, orderId } = req.params;
            const { status } = req.body;
            if (type !== 'OWNER') {
                return res.status(400).json({ errMessage: '사장만 할 수 있는 기능입니다.' });
            }
            if (!orderId) {
                return res.status(400).json({ errorMessage: '찾으려는 주문 아이디를 입력하세요.' });
            }
            if (!restaurantId) {
                return res.status(400).json({ errorMessage: '레스토랑 아이디를 작성하세요.' });
            }

            await this.orderService.updateDelivered(id, restaurantId, orderId, status);

            return res.status(200).json({ successMessage: '업데이트 되었습니다.' });
        } catch (err) {
            next(err);
        }
    };
}

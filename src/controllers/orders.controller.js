export class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder = async (req, res, next) => {

    }

    /* 사장이 매장의 주문 확인하는 메서드 */
    ownerGetOrders = async (req, res, next) => {
        try {
            const { id, type } = req.user;
            const { restaurantId } = req.params;

            // 유저 타입이 사장인지 판별
            if (type !== "OWNER") {
                return res.status(400).json({ message: "사장만 할 수 있는 기능입니다." });
            }

            if (!restaurantId) {
                return res.status(400).json({ message: "레스토랑 아이디를 작성하세요." });
            }

            const checkOrder = await this.ordersService.checkOrder(id, restaurantId);

            if (!checkOrder) {
                return res.status(400).json({ message: "현재 주문 내역이 존재하지 않습니다." });
            }

            return res.status(200).json({ data: checkOrder });
        } catch (err) {
            next(err);
        }
    }

    /* 고객이 자기 주문 확인하는 메서드 */
    guestGetOrder = async (req, res, next) => {
        try {
            const { id } = req.user;

            const orders = await this.ordersService.findOrders(id);

            if (!orders) {
                return res.status(400).json({ message: "현재 주문 내역이 존재하지 않습니다." });
            }

            return res.status(200).json({ data: orders });
        } catch (err) {
            next(err);
        }
    }
}
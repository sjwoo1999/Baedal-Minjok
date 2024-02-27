import express from 'express';
import { prisma } from '../models/index.js';
import {AuthController} from '../middlewares/auth/auth.middleware.controller.js';
import {AuthService} from '../middlewares/auth/auth.middleware.service.js';

const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

const router = express.Router();

// 사장 아이디까지 조회해야하나? 안해야될꺼같다..
router.get('/:restaurantId', async (req, res, next) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: +restaurantId,
            },
            select: {
                id: true,
                name: true,
                callNumber: true,
                kind: true,
                restaurantInfo: true,
                sales: true,
                rate: true,
            }
        });

        if (!restaurant) {
            return res.status(404).json({ message: "해당 레스토랑을 찾을 수 없습니다." });
        }

        return res.status(200).json({ data: restaurant });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "에러가 발생했습니다." });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { value } = req.query;

        const restaurants = await prisma.restaurant.findMany({
            where: {
                OR: [
                    { name: { contains: value } },
                    { restaurantInfo: { contains: value } },
                    { menus: { some: { OR: [{ name: { contains: value } }, { menuInfo: { contains: value } }] } } }
                ]
            },
            include: {
                menus: {
                    where: {
                        OR: [
                            { name: { contains: value } },
                            { menuInfo: { contains: value } }
                        ]
                    }
                }
            }
        });

        return res.status(200).json({ data: restaurants });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "에러가 발생했습니다." });
    }
});

export default router;
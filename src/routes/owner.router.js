import express from 'express';
import { prisma } from '../models/index.js';
import authMiddleWare from '../middlewares/need-signin.middleware.js';

// id와 onwerid 구분해야하나?????????

router.post('/:ownerid/restaurant', authMiddleWare, async (req, res, next) => {
    const { name, callNumber, kind, restaurantInfo } = req.body;
    const {ownerid} = req.user;

    try{
        const restaurant = await prisma.restaurant.create({
            data: {
                id: +ownerid,
                name: name,
                callNumber: callNumber,
                kind: kind,
                restaurantInfo: restaurantInfo
            }
        });

        return res.status(200).json({data: restaurant})
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: '에러가 발생했습니다.'});
    }
})

router.patch('/:ownerId/restuarnt/:restaurantId', async (req, res, next) => {
    try {
        const { restaurantId } = req.params;
        const { name, callNumber, kind, restaurantInfo } = req.body;
        const { ownerId } = req.user;

        const existingRestaurant = await prisma.restaurant.findFirst({
            where: {
                restaurantId: +restaurantId,
            }
        });

        if(!existingRestaurant){
            return res.status(404).json({message: "레스토랑 조회에 실패했습니다."});
        }
        if(existingRestaurant.id !== +ownerId) {
            return res.status(403).json({message: "본인의 레스토랑이 아닙니다."});
        }

        const updatedRestaurant = await prisma.restaurant.update({
            where: {
                restaurantId: existingRestaurant.restaurantId,
            },
            data: {
                name: name || existingRestaurant.name,
                callNumber: callNumber || existingRestaurant.callNumber,
                kind: kind || existingRestaurant.kind,
                restaurantInfo: restaurantInfo || existingRestaurant.restaurantInfo,
            },
        });

        return res.status(200).json({data: updatedRestaurant});

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "에러가 발생했습니다."});
    }
})

router.delete('/:ownerid/restaurant/:restaurantId', async (req, res, next) => {
    try{
        const {restaurantId} = req.params;
        const existingRestaurant = await prisma.restaurant.findFirst({
            where: {
                restaurantId: +restaurantId,
            }
        });
        
        if(!existingRestaurant) {
            return res.status(404).json({message: "레스토랑 조회에 실패했습니다."});
        }

        const {ownerid} = req.user;
        if(existingRestaurant.id !== +ownerid) {
            return res.status(403).json({message: "본인의 레스토랑이 아닙니다."})
        }

        await prisma.restaurant.delete({
            where: {
                restaurantId: +restaurantId,
            },
        });

        return res.status(200).json({message: "레스토랑 정보가 성공적으로 삭제되었습니다."})
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "에러가 발생했습니다."});
    }
})
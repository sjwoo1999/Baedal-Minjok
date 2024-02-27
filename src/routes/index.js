import express from 'express';
import UserRouter from './users.router.js';
import OwnerMenuRouter from './ownermenus.router.js';

const router = express.Router();

router.use('/users/', UserRouter);

router.use('/owners/', OwnerMenuRouter)

export default router;

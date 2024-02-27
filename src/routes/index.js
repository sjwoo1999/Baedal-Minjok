import express from 'express';
import UserRouter from './users.router.js';
import OwnerRouter from './owner.router.js';

const router = express.Router();

router.use('/users/', UserRouter);
router.use('/owner/', OwnerRouter);

export default router;

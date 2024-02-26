import express from 'express';
import UserRouter from './users.router.js';

const router = express.Router();

router.use('/users/', UserRouter);

export default router;

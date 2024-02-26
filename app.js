import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './src/routes/index.js';
import LogMiddleware from './src/middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './src/middlewares/error-handling.middleware.js';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
    console.log(PORT, ' 포트로 서버가 열렸어요!');
});

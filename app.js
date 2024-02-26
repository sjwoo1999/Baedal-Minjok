import express from 'express';
import MenusRouter from './src/routes/menus.router.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api',MenusRouter);

app.listen(PORT, () => {
    console.log(PORT, ' 포트로 서버가 열렸어요!');
});

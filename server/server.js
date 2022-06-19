require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const productsRouter = require('./router/productsRouter');
const userRouter = require('./router/userRouter');
const orderRouter = require('./router/orderRouter');
const shopRouter = require('./router/shopRouter')
const sequelize = require('./dataBase');
const cors = require('cors');
const errorHandler = require('./Middleware/ErrorHandlingMiddleware');
const PORT = process.env.PORT || 5000;

const options = {
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Disposition']
}

const app = express();
app.use(express.json());
app.use(cors(options));
app.use(cookieParser());

app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/shop', shopRouter);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('server started on port ' + PORT))
    } catch (e) {
        console.log(e);
    }
}
start();
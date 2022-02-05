require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const config = require('config');
const ropesRouter = require('./router/ropesRouter');
const userRouter = require('./router/userRouter');
const orderRouter = require('./router/orderRouter');
const sequelize = require('./dataBase');
const models = require('./models/models');
const cors = require('cors');
const errorHandler = require('./Middleware/ErrorHandlingMiddleware');
const PORT = process.env.PORT || 5000;

const app = express();
const options = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use('/api/ropes', ropesRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

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
const express = require('express');
const config = require('config');
const ropesRouter = require('./Routes/ropesRouter');
const sequelize = require('./dataBase');
const models = require('./models/models');
const cors = require('cors');
const errorHandler = require('./Middleware/ErrorHandlingMiddleware');
const PORT = config.get('port') || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ropes', ropesRouter);
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


const Router = require('express');
const router = new Router();
const controller = require('../Controllers/orderController');

router.post('/createOrder', controller.createOrder);
router.get('/getOrderByUser/:user_id', controller.getOrderByUser);
router.get('/getOrderByShop/:shop_id', controller.getOrderByShop)

module.exports = router;
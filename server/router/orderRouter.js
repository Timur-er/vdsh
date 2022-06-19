const Router = require('express');
const router = new Router();
const controller = require('../Controllers/orderController');
const cors = require('cors');

router.post('/createOrder', controller.createOrder);
router.get('/getOrderByUser/:user_id', controller.getOrderByUser);
router.get('/getOrderByShop/:shop_id', controller.getOrderByShop)
router.get('/getProductsForOrderByBrand', controller.getProductsForOrderByBrand);
router.get('/getAllOrdersForOrder', controller.getAllOrdersForOrder)
router.get('/getAllOrders', controller.getAllOrders);
router.get('/getExcelFile/:order_id', controller.getExcel)
router.post('/changeOrderStatus', controller.changeOrderStatus)
router.get('/getFilteredOrders/:shop_id&:brand_id', controller.getFilteredOrders)

module.exports = router;
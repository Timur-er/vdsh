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
router.get('/getExcelFileByOrderId/:order_id', controller.getExcelByOrderId)
router.get('/getFilteredExcel/:address&:brand_name', controller.getFilteredExcel)
router.post('/changeOrderStatus', controller.changeOrderStatus)
router.get('/getFilteredOrders/:address&:brand_name', controller.getFilteredOrders)
router.get('/getFilteredOrdersForOrder/:address&:brand_name', controller.getFilteredOrdersForOrder)
router.delete('/deleteOrder/:order_id', controller.deleteOrder)

module.exports = router;
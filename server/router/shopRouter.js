const Router = require('express');
const router = new Router();
const controller = require('../Controllers/shopController');

router.get('/getAllShops', controller.getAllShops);
router.post('/addShop', controller.addShop);

module.exports = router;
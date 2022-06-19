const Router = require('express');
const router =  new Router();
const controller = require('../Controllers/productsController');

router.post('/addProducts', controller.addProducts);
router.post('/addProductBrand', controller.addProductBrand);
router.get('/getAllProductsByBrand/:id', controller.getAllProductsByBrand);
router.get('/getAllProducts', controller.getAllProducts);
router.get('/getAllBrands', controller.getAllBrands);
router.get('/getBrandId/:brand_name', controller.getBrandId);

module.exports = router;
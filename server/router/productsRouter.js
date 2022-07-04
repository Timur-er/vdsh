const Router = require('express');
const router =  new Router();
const controller = require('../Controllers/productsController');

router.post('/addProducts', controller.addProducts);
router.post('/addProductBrand', controller.addProductBrand);
router.get('/getAllProductsByBrand/:id', controller.getAllProductsByBrand);
router.get('/getAllProducts', controller.getAllProducts);
router.get('/getAllBrands', controller.getAllBrands);
router.get('/getBrandId/:brand_name', controller.getBrandId);
router.post('/changeProductInfo/:prev_product_id&:new_product_id&:quantity&:brand_id', controller.changeProductInfo)

module.exports = router;
const Router = require('express');
const router =  new Router();
const controller = require('../Controllers/ropesController');

router.post('/addRopesItems', controller.addRopesItems);
router.post('/addRopeBrand', controller.addRopeBrand);
router.get('/getAllRopesByBrand/:id', controller.getAllRopesByBrand);
router.get('/getAllRopes', controller.getAllRopes);
router.get('/getAllBrands', controller.getAllBrands);

module.exports = router;
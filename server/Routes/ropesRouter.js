const Router = require('express');
const router =  new Router();
const controller = require('../Controllers/ropesController');

router.post('/addRopeItem', controller.addRopeItem);
router.post('/addRopeBrand', controller.addRopeBrand);
router.get('/getAllRopesByBrand', controller.getAllRopesByBrand);
router.get('/getAllRopes', controller.getAllRopes);

module.exports = router;
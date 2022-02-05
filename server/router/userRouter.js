const Router = require('express');
const router = new Router();
const controller = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');


router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', controller.check);
router.get('/activate/:link', controller.activate);
router.get('/refresh', controller.refresh);
router.get('/logout', controller.logout)
router.get('/getAllUsers', authMiddleware, controller.getAllUsers);
router.post('/changeUserRole', controller.changeUserRole);

module.exports = router;
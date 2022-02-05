const {Users, ShopAddresses, Orders} = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const ApiError = require('../ApiError/ApiError');
const userService = require('../service/user-service');


// const generateJwt = (id, email, name, surname, shop_id) => {
//     return jwt.sign({
//         id,
//         email,
//         name,
//         surname,
//         shop_id
//     }, process.env.SECRET_KEY, {expiresIn: '24h'})
// }

class UserController {
    async registration(req, res, next) {
        try {
            const {email, name, surname, shopAddress, password} = req.body;
            const userData = await userService.registration(email, name, surname, shopAddress, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
            // if (!email || !password) {
            //     return next(ApiError.badRequest('Не корекктный'));
            // }
            //
            // const candidate = await Users.findOne({where: {email}});
            //
            // if (candidate) {
            //     return next(ApiError.badRequest('is taken'));
            // }
            //
            // const hashPassword = await bcrypt.hash(password, 5);
            //
            // const shop = await ShopAddresses.create({address: shopAddress});
            // const user = await Users.create({
            //     email,
            //     name,
            //     surname,
            //     shop_id: shop.id,
            //     password: hashPassword
            // });
            // const order = await Orders.create({
            //     user_id: user.id,
            //     shop_id: shop.id
            // });
            //
            // const token = generateJwt(user.id, email, name, surname, shop.id)
            //
            // return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
            // console.log('email = '+ email);
            // console.log('password = '+ password);
            //
            // const user = await Users.findOne({where: {email}});
            // if (!user) {
            //     return next(ApiError.internal('Пользователь не найден'))
            // }
            //
            // let comparePassword = bcrypt.compareSync(password, user.password);
            // if (!comparePassword) {
            //     return next(ApiError.internal('incorrect password'))
            // }
            //
            // const token = generateJwt(user.id, user.email, user.name, user.surname, user.shop_id)
            // return res.json({user, token});
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            // refresh token +
            const userData = await userService.refresh(refreshToken);
            // console.log('user data');
            // console.log(userData);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async check(req, res) {

    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res) {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    async changeUserRole(req, res, next) {
        try {
            const user_id = req.params.user_id;
            const newRole = req.params.role;
            console.log(newRole);
            console.log(user_id);
            const newUser = await userService.changeUserRole(user_id, newRole);
            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
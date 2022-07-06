const userService = require('../service/user-service');


const cookieConfig = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true,
    httpOnly: true,
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, name, surname, shop_address, password} = req.body;
            const user_data = await userService.registration(email, name, surname, shop_address, password);
            res.cookie('refresh_token', user_data.refresh_token, cookieConfig);
            return res.json(user_data);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user_data = await userService.login(email, password);
            res.cookie('refresh_token', user_data.refresh_token, cookieConfig);
            return res.json(user_data);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activation_link = req.params.link;
            await userService.activate(activation_link);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refresh_token} = req.cookies;
            const userData = await userService.refresh(refresh_token);
            res.cookie('refresh_token', userData.refresh_token, cookieConfig);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async check(req, res) {

    }

    async logout(req, res, next) {
        try {
            const {refresh_token} = req.cookies;
            const token = await userService.logout(refresh_token);
            res.clearCookie('refresh_token')
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
            const {user_id, new_role} = req.body;
            const new_user = await userService.changeUserRole(user_id, new_role);
            return res.json(new_user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
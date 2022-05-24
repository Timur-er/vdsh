const userService = require('../service/user-service');


const cookieConfig = {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, name, surname, shopAddress, password} = req.body;
            const userData = await userService.registration(email, name, surname, shopAddress, password);
            res.cookie('refreshToken', userData.refreshToken, {...cookieConfig});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            console.log(userData);
            res.cookie('refreshToken', userData.refreshToken, cookieConfig);
            return res.json(userData);
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
            const userData = await userService.refresh(refreshToken);
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true});
            res.cookie('refreshToken', userData.refreshToken, cookieConfig);
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
            const {user_id, newRole} = req.body;
            const newUser = await userService.changeUserRole(user_id, newRole);
            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
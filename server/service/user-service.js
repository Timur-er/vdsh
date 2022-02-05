const {Users, ShopAddresses} = require('../models/models')
const uuid = require('uuid');
const mailService = require('./mail-service');
const TokenService = require('./token-service');
const bcrypt = require('bcrypt');
const ApiError = require('../ApiError/ApiError')

class UserService {
    async registration(email, name, surname, shopAddress, password) {
        // передаю не id магазина, а его название
        console.log('shop address ');
        console.log(shopAddress);
        const candidate = await Users.findOne({where: {email}});
        if (candidate) {
            console.log('user is already exist');
            throw new Error('already register');
        }
        const hashPassword = await bcrypt.hash(password, 4);
        const activationLink = uuid.v4();

        const [shop, created] = await ShopAddresses.findOrCreate({where: {address: shopAddress}});

        const user = await Users.create({
            email,
            name,
            surname,
            shop_id: shop.id,
            isActivated: false,
            role: 'USER',
            activationLink,
            password: hashPassword
        })

        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
        const tokens = TokenService.generateTokens({id: user.id, email, name, surname, shop_id:shop.id}) //payload: email, id, shopAddress, else...
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens, user: {user_id: user.id, email, name, surname, shop_id: shop.id, role: user.role, isActivated: user.isActivated}}
    }

    async login (email, password) {
        const user = await Users.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден');
        }

        const comparePasswords = await bcrypt.compare(password, user.password);
        if (!comparePasswords) {
            throw ApiError.badRequest('Не коректный пароль');
        }
        const {id, name, surname, shop_id} = user;
        const tokens = TokenService.generateTokens({id, email, name, surname, shop_id});
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens, user: {user_id: user.id, email, name, surname, shop_id}}
    }

    async activate(activationLink) {
        const user = await Users.findOne({where: {activationLink}});
        if (!user) {
            throw new Error('incorrect link');
        }
        await Users.update({isActivated: true}, {where: {activationLink}});
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.internal('invalid token')
        }

        const userData = await TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.internal('Unauthorized user');
        }
        const user = await Users.findOne({where: {id: userData.id}})
        const {id, email, name, surname, shop_id, isActivated} = user;
        const tokens = TokenService.generateTokens({id, email, name, surname, shop_id});
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens, user: {user_id: user.id, email, name, surname, shop_id, isActivated}}
    }

    async getAllUsers() {
        const users = await Users.findAll();
        return users;
    }

    async changeUserRole (user_id, role) {
        const user = await Users.update({role}, {where: {id:user_id}})
        return {user, message: 'Role was changed'};
    }
}

module.exports = new UserService();
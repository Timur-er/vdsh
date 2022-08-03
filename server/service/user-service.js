const {users: user_model, shopAddresses} = require('../models/models')
const uuid = require('uuid');
const mailService = require('./mail-service');
const TokenService = require('./token-service');
const bcrypt = require('bcrypt');
const ApiError = require('../ApiError/ApiError')

class UserService {
    async registration(email, name, surname, shop_address, password) {
        const candidate = await user_model.findOne({where: {email: email}});
        if (candidate) {
            throw new Error('already register');
        }
        const hash_password = await bcrypt.hash(password, 4);
        const activation_link = uuid.v4();

        const shop = await shopAddresses.findOne({where: {address: shop_address}});

        const user = await user_model.create({
            email,
            name,
            surname,
            shop_id: shop.id,
            is_activated: false,
            role: 'USER',
            activation_link,
            password: hash_password
        })
        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/user/activate/${activation_link}`);
        const tokens = await TokenService.generateTokens({id: user.id, email, name, surname, shop_id: shop.id}) //payload: email, id, shopAddress, else...
        await TokenService.saveToken(user.id, tokens.refresh_token);
        return { ...tokens, user: {user_id: user.id, email, name, surname, shop_id: shop.id, role: user.role, is_activated: user.is_activated}}
    }

    async login (email, password) {
        const user = await user_model.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден');
        }

        const compare_passwords = await bcrypt.compare(password, user.password);
        if (!compare_passwords) {
            throw ApiError.badRequest('Не коректный пароль');
        }
        const {id, name, surname, shop_id, role} = user;
        const tokens = await TokenService.generateTokens({id, email, name, surname, shop_id});
        await TokenService.saveToken(user.id, tokens.refresh_token);
        return {...tokens, user: {user_id: user.id, role, email, name, surname, shop_id}}
    }

    async activate(activation_link) {
        const user = await user_model.findOne({where: {activation_link}});
        if (!user) {
            throw new Error('incorrect link');
        }
        await user_model.update({is_activated: true}, {where: {activation_link}});
    }

    async logout(refresh_token) {
        const token = await TokenService.removeToken(refresh_token);
        return token;
    }

    async refresh(refresh_token) {
        if (!refresh_token) {
            throw ApiError.internal('invalid token')
        }

        const user_data = await TokenService.validateRefreshToken(refresh_token);
        const token_from_db = await TokenService.findToken(refresh_token);
        if (!user_data || !token_from_db) {
            throw ApiError.internal('Unauthorized user');
        }
        const user = await user_model.findOne({where: {id: user_data.id}})
        const {id, email, name, surname, shop_id, role, is_activated} = user;
        const tokens = await TokenService.generateTokens({id, email, name, surname, shop_id});
        await TokenService.saveToken(user.id, tokens.refresh_token);
        return {...tokens, user: {user_id: user.id, email, name, surname, role, shop_id, is_activated }}
    }

    async getAllUsers() {
        const users = await user_model.findAll();
        return users;
    }

    async changeUserRole (user_id, role) {
        const user = await user_model.update({role}, {where: {id:user_id}})
        return {user, message: 'Role was changed'};
    }
}

module.exports = new UserService();
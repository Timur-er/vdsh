const jwt = require('jsonwebtoken');
const {UserTokens} = require('../models/models');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '60m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async validateAccessToken(token) {
        try {
            const secret =  process.env.SECRET_KEY;
            const userData = await jwt.verify(token, secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(token) {
        try {
            const refreshToken = process.env.JWT_REFRESH
            const userData = await jwt.verify(token, refreshToken);
            // console.log('user data');
            // console.log(userData);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        await UserTokens.update({refreshToken}, {where: {user_id: userId}})

        const token = await UserTokens.create({user_id: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await UserTokens.findOne({where: {refreshToken}});
        await tokenData.destroy();
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await UserTokens.findOne({where: {refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();
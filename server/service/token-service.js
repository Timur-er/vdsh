const jwt = require('jsonwebtoken');
const {userTokens} = require('../models/models');

class TokenService {
    async generateTokens(payload) {
        const access_token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '60m'});
        const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'});
        return {access_token, refresh_token};
    }

    async validateAccessToken(token) {
        try {
            const secret =  process.env.SECRET_KEY;
            const user_data = await jwt.verify(token, secret);
            return user_data;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(token) {
        try {
            const refresh_token = process.env.JWT_REFRESH
            const user_data = await jwt.verify(token, refresh_token);
            return user_data;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user_id, refresh_token) {
        await userTokens.update({refresh_token}, {where: {user_id}})

        const token = await userTokens.create({user_id, refresh_token});
        return token;
    }

    async removeToken(refresh_token) {
        const token_data = await userTokens.findOne({where: {refresh_token}});
        await token_data.destroy();
        return token_data;
    }

    async findToken(refresh_token) {
        const token_data = await userTokens.findOne({where: {refresh_token}});
        return token_data;
    }
}

module.exports = new TokenService();
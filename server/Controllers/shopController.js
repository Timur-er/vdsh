const {shopAddresses} = require('../models/models');

class controller {
    async getAllShops(req, res) {
        try {
            const shops = await shopAddresses.findAll();
            return res.json(shops);
        } catch (e) {
            console.log(e);
        }
    }

    async addShop(req, res) {
        const {shop_address} = req.body;
        await shopAddresses.create({address: shop_address});
        return res.json('shop are successfully added')
    }
}

module.exports = new controller();
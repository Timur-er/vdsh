const {ShopAddresses} = require('../models/models');

class controller {
    async getAllShops(req, res) {
        try {
            const shops = await ShopAddresses.findAll();
            return res.json(shops);
        } catch (e) {
            console.log(e);
        }
    }

    async addShop(req, res) {
        const {shopAddress} = req.body;
        await ShopAddresses.create({address: shopAddress});
        return res.json('shop are successfully added')
    }
}

module.exports = new controller();
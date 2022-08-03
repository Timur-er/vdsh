const {shopAddresses} = require('../models/models');

class ShopService {
    async getShopName(shop_id) {
        const shop_address = await shopAddresses.findOne({where: {id: shop_id}});
        return shop_address.address;
    }

    async getShopId(address) {
        const data = await shopAddresses.findOne({where: {address: address}});
        return data.id;
    }
}

module.exports = new ShopService();
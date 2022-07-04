const {ShopAddresses} = require('../models/models');

class ShopService {
    async getShopName(shop_id) {
        const shop_address = await ShopAddresses.findOne({where: {id: shop_id}});
        return shop_address.address;
    }

    async getShopId(address) {
        const data = await ShopAddresses.findOne({where: {address: address}});
        return data.id;
    }
}

module.exports = new ShopService();
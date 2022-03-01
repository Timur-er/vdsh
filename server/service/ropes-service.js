const {ropesInStock} = require("../models/models");
const orderService = require("./order-service");

class RopesService {
    async updateAvailableQuantity(brand_id, shop_id, orderArray) {
        for (let order of orderArray) {
            const {quantity, color_id} = order;
            const currentQuantity = await ropesInStock.findOne({where: {brandId: brand_id, color_id: color_id}});
            const newQuantity = currentQuantity.quantity - quantity;
            await ropesInStock.update({quantity: newQuantity}, {where: {brandId: brand_id, color_id: color_id}})
            if (newQuantity < 0) {
                const quantity = newQuantity * -1;
                let date = new Date();
                date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
                await orderService.createProductsForOrder(color_id, quantity, brand_id, shop_id, date);
            }
        }
    }
}

module.exports = new RopesService();
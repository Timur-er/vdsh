const {ropesInStock} = require("../models/models");
const orderService = require("./order-service");

class ProductsService {
    async updateAvailableQuantity(brand_id, shop_id, order_details) {
        let products_for_order = [];
        let out_of_stock = false;
        for (let order of order_details) {
            const {quantity, color_id} = order;
            const rope = await ropesInStock.findOne({where: {brand_id, color_id: color_id}});
            const new_quantity = rope.quantity - quantity;
            await ropesInStock.update({quantity: new_quantity}, {where: {brand_id, color_id: color_id}})
            if (new_quantity < 0) {
                out_of_stock = true;
                const quantity = new_quantity * -1;
                products_for_order.push({color_id, quantity})
            }
        }
        if (out_of_stock) {
            let date = new Date();
            date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
            await orderService.createProductsForOrder(brand_id, shop_id, date, products_for_order);
        }

    }
}

module.exports = new ProductsService();
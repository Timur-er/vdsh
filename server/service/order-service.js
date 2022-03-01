const {Orders, ropesBrand, OrderDetails, ProductsForOrder, ProductsForOrderDetails} = require("../models/models");

class OrderService {
    // нужно будет подумать как вынести логику из двух функций в другое место
    async getOrdersByUser(user_id) {
        const userOrder = await Orders.findAll({where: {user_id}});
        const responseData = [];
        for (let order of userOrder) {
            const {id, brand_id, order_status, order_date} = order;
            // console.log(order_status);
            const brandData = await ropesBrand.findOne({where: {id: brand_id}});
            const {brandName} = brandData;
            // console.log(brandName);
            const orderDetails = await OrderDetails.findAll({where: {order_id: id}});
            const orderData = {order_id: id, brandName, order_status, order_date, orderDetails};
            responseData.push(orderData);
        }
        return responseData;
    }

    async getOrderByShop(shop_id) {
        const shopOrders = await Orders.findAll({where: {shop_id}});
        const responseData = [];
        for (let order of shopOrders) {
            const {id, brand_id, order_status, order_date} = order;
            const brandData = await ropesBrand.findOne({where: {id: brand_id}});
            const {brandName} = brandData;
            // console.log(brandName);
            const orderDetails = await OrderDetails.findAll({where: {order_id: id}});
            const orderData = {order_id: id, brandName, order_status, order_date, orderDetails};
            responseData.push(orderData);
        }
        return responseData;
    }

    async createProductsForOrder(color_id, quantity, brandId, shop_id, order_date) {
        const createOrder = await ProductsForOrder.create({shop_id, brand_id: brandId, order_status: 'active', order_date});
        await ProductsForOrderDetails.create({products_for_order_id: createOrder.id, color_id, quantity, brandId});
    }
}

module.exports = new OrderService();
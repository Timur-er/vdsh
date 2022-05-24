const {Orders, ropesBrand, OrderDetails, ProductsForOrder, ProductsForOrderDetails, ShopAddresses} = require("../models/models");

class OrderService {
    async getOrdersByUser(user_id) {
        const userOrder = await Orders.findAll({where: {user_id}});
        const responseData = [];
        for (let order of userOrder) {
            const {id, brand_id, order_status, order_date} = order;
            const brandData = await ropesBrand.findOne({where: {id: brand_id}});
            const {brandName} = brandData;
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
            const orderDetails = await OrderDetails.findAll({where: {order_id: id}});
            const orderData = {order_id: id, brandName, order_status, order_date, orderDetails};
            responseData.push(orderData);
        }
        return responseData;
    }

    async createProductsForOrder(brandId, shop_id, order_date, productsForOrder) {
        const createOrder = await ProductsForOrder.create({shop_id, brand_id: brandId, order_status: 'active', order_date});
        for (let order of productsForOrder) {
            const {color_id, quantity} = order;
            await ProductsForOrderDetails.create({products_for_order_id: createOrder.id, color_id, quantity});
        }
    }

    async getOrderById(order_id) {
        const orderData = await Orders.findAll({where: {id: order_id}});
        const orderDetails = await OrderDetails.findAll({where: {order_id: order_id}});
        const {brand_id, shop_id} = orderData[0];
        const brandData = await ropesBrand.findOne({where: {id: brand_id}});
        const brand_name = brandData.brandName;
        const shopData = await ShopAddresses.findOne({where: {id: shop_id}});
        console.log(shopData);
        const shop_name = shopData.address;
        const order = orderDetails.map(order => {
            const {color_id, quantity} = order;
            return {color_id, quantity};
        })

        const returnOrderData = {order_id: order_id, brand_name: brand_name, shop_name: shop_name, order: order};
        return returnOrderData;
    }
}

module.exports = new OrderService();
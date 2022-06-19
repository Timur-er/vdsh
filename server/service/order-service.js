const {Orders, ropesBrand, OrderDetails, ProductsForOrder, ProductsForOrderDetails, ShopAddresses} = require("../models/models");
const shopService = require("./shop-service");

class OrderService {
    async getOrdersByUser(user_id) {
        let user_orders = await Orders.findAll({where: {user_id}});
        user_orders = await this.getOrdersDetails(user_orders);
        // const response_data = [];
        // for (let order of user_order) {
        //     const {id, brand_id, order_status, order_date} = order;
        //     const brand_data = await ropesBrand.findOne({where: {id: brand_id}});
        //     const {brand_name} = brand_data;
        //     const order_details = await OrderDetails.findAll({where: {order_id: id}});
        //     const order_data = {order_id: id, brand_name, order_status, order_date, order_details};
        //     response_data.push(order_data);
        // }
        return user_orders;
    }

    async getOrderByShop(shop_id) {
        let shop_orders = await Orders.findAll({where: {shop_id}});
        shop_orders = await this.getOrdersDetails(shop_orders);
        // const response_data = [];
        // for (let order of shop_orders) {
        //     const {id, brand_id, order_status, order_date} = order;
        //     const brand_data = await ropesBrand.findOne({where: {id: brand_id}});
        //     const {brand_name} = brand_data;
        //     const order_details = await OrderDetails.findAll({where: {order_id: id}});
        //     const order_data = {order_id: id, brand_name, order_status, order_date, order_details};
        //     response_data.push(order_data);
        // }
        return shop_orders;
    }

    async createProductsForOrder(brand_id, shop_id, order_date, products_for_order) {
        const create_order = await ProductsForOrder.create({shop_id, brand_id, order_status: 'Активний', order_date});
        for (let order of products_for_order) {
            const {color_id, quantity} = order;
            await ProductsForOrderDetails.create({order_id: create_order.id, color_id, quantity});
        }
    }

    async getOrderById(order_id) {
        // возможно это нужно заменить?
        const order_data = await Orders.findAll({where: {id: order_id}});
        const order_details = await OrderDetails.findAll({where: {order_id: order_id}});
        const {brand_id, shop_id} = order_data[0];
        const brand_data = await ropesBrand.findOne({where: {id: brand_id}});
        const brand_name = brand_data.brand_name;
        const shop_data = await ShopAddresses.findOne({where: {id: shop_id}});
        const shop_name = shop_data.address;
        const order = order_details.map(order => {
            const {color_id, quantity} = order;
            return {color_id, quantity};
        })

        const return_order_data = {order_id: order_id, brand_name, shop_name: shop_name, order: order};
        return return_order_data;
    }

    async getOrdersDetails(orders) {
        const response_data = [];
        for (let order of orders) {
            const { id, brand_id, order_status, order_date, shop_id } = order;
            const brand_data = await ropesBrand.findOne({where: {id: brand_id}});
            const {brand_name} = brand_data;
            const order_details = await OrderDetails.findAll({where: {order_id: id}});
            const shop_address = await shopService.getShopName(shop_id);
            const order_data = {order_id: id, brand_name, order_status, order_date, order_details, shop_address};
            response_data.push(order_data);
        }

        return response_data;
    }
}

module.exports = new OrderService();
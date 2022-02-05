const {Orders, OrderDetails, ropesBrand} = require('../models/models');
const orderService = require('../service/order-service');

class controller {
    async createOrder(req, res) {
        try {
            const {user_id, shop_id, brand_id, orderDetails} = req.body;
            let date = new Date();
            date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
            const createOrder = await Orders.create({user_id, shop_id, brand_id, order_status: 'active', order_date: date});
            const order_id = createOrder.id;
            console.log(orderDetails);
            for (const order of orderDetails) {
                const {color_id, quantity} = order;
                await OrderDetails.create({order_id, color_id, quantity});
            }
            return res.json('Заказ успешно оформлен');
        } catch (e) {
            console.log(e);
        }
    }

    async getOrderByUser(req, res) {
        try {
            const user_id = req.params.user_id;
            // тут нужно будет искать все заказы, подумать нужно ли возвращать имена значений, а не только их id;
            // const userOrder = await Orders.findAll({where: {user_id}});
           const orders = await orderService.getOrdersByUser(user_id);
           return res.json(orders)
            // const userOrderDetails = await OrderDetails.findAll({where: {order_id: userOrder.id}})
            // return res.json(data);
        }
         catch (e) {
            console.log(e);
        }
    }

    async getOrderByShop(req, res) {
        try {
            const shop_id = req.params.shop_id;
            const orders = await orderService.getOrderByShop(shop_id);
            return res.json(orders);
        } catch (e) {
            console.log(e);
        }
    }

    async changeOrderStatus(req, res) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async getAllOrders(req, res) {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new controller();
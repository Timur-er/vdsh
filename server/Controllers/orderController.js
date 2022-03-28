const {Orders, OrderDetails, ropesBrand, ProductsForOrder, ProductsForOrderDetails} = require('../models/models');
const orderService = require('../service/order-service');
const ropesService = require('../service/ropes-service');

class controller {
    async createOrder(req, res) {
        try {
            const {user_id, shop_id, brand_id, orderDetails} = req.body;

            let date = new Date();
            date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();

            const createOrder = await Orders.create({user_id, shop_id, brand_id, order_status: 'active', order_date: date});
            const order_id = createOrder.id;

            console.log('order details');
            console.log(orderDetails);

            await ropesService.updateAvailableQuantity(brand_id, shop_id, orderDetails)

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
           const orders = await orderService.getOrdersByUser(user_id);
           return res.json(orders)
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

    async getProductsForOrderByBrand(req, res) {
        try {
            const products_for_order = [];
            const orders = await ProductsForOrder.findAll();
            for (let order of orders) {
                const {brand_id, order_status, id, order_date} = order;
                const brand_name = await ropesBrand.findOne({where: {id: brand_id}});
                const order_details = await ProductsForOrderDetails.findAll({where: {products_for_order_id: id}});
                products_for_order.push({brand_name: brand_name.brandName, order_status, order_details, id, order_date});
            }
            return res.json(products_for_order);
        } catch (e) {
            console.log(e);
        }
    }

    async getFilteredOrders(req, res) {
        try {
            const {brand_id, shop_id} = req.params
            console.log(brand_id);
            console.log(shop_id);
        } catch (e) {

        }
    }
}

module.exports = new controller();
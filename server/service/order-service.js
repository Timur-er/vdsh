const {orders, brand, orderDetails, productsForOrder, productsForOrderDetails, shopAddresses} = require("../models/models");
const shopService = require("./shop-service");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

class OrderService {
    async getOrdersByUser(user_id) {
        let user_orders = await orders.findAll({where: {user_id}});
        user_orders = await this.getOrdersDetails(user_orders);
        return user_orders;
    }

    async getOrderByShop(shop_id) {
        let shop_orders = await orders.findAll({where: {shop_id}});
        shop_orders = await this.getOrdersDetails(shop_orders);
        return shop_orders;
    }

    async createProductsForOrder(brand_id, shop_id, order_date, products_for_order) {
        const create_order = await productsForOrder.create({shop_id, brand_id, order_status: 'Активний', order_date});
        for (let order of products_for_order) {
            const {color_id, quantity} = order;
            await productsForOrderDetails.create({order_id: create_order.id, color_id, quantity});
        }
    }

    async getOrderById(order_id) {
        // возможно это нужно заменить?
        const order_data = await orders.findAll({where: {id: order_id}});
        const order_details = await orderDetails.findAll({where: {order_id: order_id}});
        const {brand_id, shop_id} = order_data[0];
        const brand_data = await brand.findOne({where: {id: brand_id}});
        const brand_name = brand_data.brand_name;
        const shop_data = await shopAddresses.findOne({where: {id: shop_id}});
        const shop_name = shop_data.address;
        const order = order_details.map(order => {
            const {color_id, quantity} = order;
            return {color_id, quantity};
        })

        const return_order_data = {order_id: order_id, brand_name, shop_name: shop_name, order_details: order};
        return return_order_data;
    }

    async getOrdersDetails(orders) {
        const response_data = [];
        for (let order of orders) {
            const { id, brand_id, order_status, order_date, shop_id } = order;
            const brand_data = await brand.findOne({where: {id: brand_id}});
            const {brand_name} = brand_data;
            let order_details = await orderDetails.findAll({where: {order_id: id}});
            let normalize_details = [];
            order_details.forEach(details => {
                normalize_details.push({color_id: details.color_id, quantity: details.quantity, is_available: details.is_available})
            })
            const shop_address = await shopService.getShopName(shop_id);
            const order_data = {order_id: id, brand_name, order_status, order_date, order_details: normalize_details, shop_address};
            response_data.push(order_data);
        }

        return response_data;
    }

    async jsonToExcel(order_data, file_name) {
        const work_book = xlsx.utils.book_new();
        if (order_data.length >= 1) {
            order_data.forEach(order => {
                let { brand_name, shop_address, order_details, order_id } = order;
                order_details = order_details.map(({color_id, quantity, is_available}) => ({
                    номер: color_id, кількість: quantity, в_наявності: is_available ? 'так' : 'ні'
                }))
                const work_sheet = xlsx.utils.json_to_sheet(order_details);
                xlsx.utils.book_append_sheet(work_book, work_sheet, `${brand_name} на ${shop_address} id ${order_id}`);
            })
        } else {
            file_name = `Замовлення ${order_data.brand_name} id ${order_data.order_id}`;
            const work_sheet = xlsx.utils.json_to_sheet(order_data.order_details);
            xlsx.utils.book_append_sheet(work_book, work_sheet, `Заказ ${order_data.brand_name} на ${order_data.shop_name}`);
        }
        let file_path = path.basename(file_name);
        file_path = path.resolve(__dirname+'/../Excel', file_path);
        fs.writeFile(file_path, 'content', (e) => {
            console.log(e);})
        const work_book_options = {bookType: 'xlsx', type: 'binary'};
        xlsx.writeFile(work_book, file_path, work_book_options);
        return { file_path, file_name, work_book }
    }
}

module.exports = new OrderService();
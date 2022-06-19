const {
    Orders,
    OrderDetails,
    ropesBrand,
    ProductsForOrder,
    ProductsForOrderDetails,
    ShopAddresses
} = require('../models/models');
const orderService = require('../service/order-service');
const ropesService = require('../service/products-service');
const brandService = require('../service/brand-service');
const shopService = require('../service/shop-service');
const xlsx = require("xlsx");
const fs = require("fs");

class controller {
    async createOrder(req, res) {
        try {
            const {user_id, shop_id, brand_id, order_details} = req.body;

            let date = new Date();
            date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

            const create_order = await Orders.create({
                user_id,
                shop_id,
                brand_id,
                order_status: 'active',
                order_date: date
            });
            const order_id = create_order.id;

            console.log('order details');

            await ropesService.updateAvailableQuantity(brand_id, shop_id, order_details)

            for (const order of order_details) {
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
        } catch (e) {
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
            const {order_id, new_status, forOrder} = req.body;
            if (forOrder) {
                await ProductsForOrder.update({order_status: new_status}, {where: {id: order_id}});
            } else {
                await Orders.update({order_status: new_status}, {where: {id: order_id}})
            }
            return res.json('Статус змінено успішно')
        } catch (e) {
            console.log(e);
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Orders.findAll();
            const response_data = [];
            for (let order of orders) {
                const {id, brand_id, order_status, order_date, shop_id} = order;
                const brandData = await ropesBrand.findOne({where: {id: brand_id}});
                const {brand_name} = brandData;
                const order_details = await OrderDetails.findAll({where: {order_id: id}});

                const shop_data = await ShopAddresses.findOne({where: {id: shop_id}})

                const shop_address = shop_data.address;
                const order_data = {order_id: id, brand_name, order_status, shop_address, order_date, order_details};
                response_data.push(order_data);
            }
            return res.json(response_data);
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
                products_for_order.push({
                    brand_name: brand_name.brandName,
                    order_status,
                    order_details,
                    id,
                    order_date
                });
            }
            return res.json(products_for_order);
        } catch (e) {
            console.log(e);
        }
    }

    async getExcel(req, res) {
        let order_id = req.params.order_id;
        const order_data = await orderService.getOrderById(order_id);
        const work_book = xlsx.utils.book_new();
        const work_sheet = xlsx.utils.json_to_sheet(order_data.order); //here we need to give data
        xlsx.utils.book_append_sheet(work_book, work_sheet, `Заказ ${order_data.brand_name} на ${order_data.shop_name}`);
        const file_name = `${order_data.brand_name} id ${order_data.order_id}`;
        // const file_name = `Заказ ${order_data.brand_name} на ${order_data.shop_name}`;
        const work_book_options = {bookType: 'xlsx', type: 'binary'};
        xlsx.writeFile(work_book, file_name, work_book_options);
        const stream = fs.createReadStream(file_name);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            )
        // res.setHeader('Content-Disposition', contentDisposition(file_name))
        res.setHeader('Content-Disposition', `attachment; filename='${file_name}'`)
        stream.pipe(res)
        stream.on('close', () => stream.destroy())
    }

    async getAllOrdersForOrder(req, res) {
        const orders_for_order = await ProductsForOrder.findAll();
        let products_for_order_details = [];
        for (let order of orders_for_order) {
            const {shop_id, brand_id, order_date, order_status, id} = order;
            const order_details = await ProductsForOrderDetails.findAll({where: {order_id: id}});
            const brand_name = await brandService.getBrandName(brand_id);
            const shop_address = await shopService.getShopName(shop_id);
            products_for_order_details.push({order_id: id, brand_name, shop_address, order_date, order_status, order_details});
        }

        return res.json(products_for_order_details);
    }

    async getFilteredOrders(req, res) {
        const { brand_id, shop_id } = req.params;
        let filtered_orders = [];
        if (brand_id === 'all') {
            filtered_orders = await Orders.findAll({where: {shop_id: shop_id}});
        } else if (shop_id === 'all') {
            filtered_orders = await Orders.findAll({where: {brand_id: brand_id}});
        } else {
            filtered_orders = await Orders.findAll({where: {brand_id: brand_id, shop_id: shop_id}});
        }

        filtered_orders = await orderService.getOrdersDetails(filtered_orders);
        return res.json(filtered_orders);
    }
}

module.exports = new controller();
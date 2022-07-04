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
const path = require('path')
const {add} = require("nodemon/lib/rules");

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
                order_status: 'Активний',
                order_date: date
            });
            const order_id = create_order.id;

            for (const order of order_details) {
                const {color_id, quantity} = order;
                await OrderDetails.create({order_id, color_id, quantity});
            }

            await ropesService.updateAvailableQuantity(order_id, brand_id, shop_id, order_details)

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

    async getExcelByOrderId(req, res) {
        let order_id = req.params.order_id;
        const order_data = await orderService.getOrderById(order_id);
        const excel = await orderService.jsonToExcel(order_data);
        // const stream = fs.createReadStream(excel.file_path);

        res.setHeader('Content-Disposition', `attachment; filename=${excel.file_name}`);
        res.end(xlsx.write(excel.work_book, {type: "buffer", bookType: 'xlsx'}));
        // res.setHeader(
        //     "Content-Type",
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //     )
        // res.setHeader('Content-Disposition', `attachment; filename='${file.file_name}'`)
        // stream.pipe(res)
    }

    async getFilteredExcel(req, res) {
        const {address, brand_name} = req.params;

        // maybe I need to create file path here and then trow it to each function
        let file_name = '';
        const shop_id = address !== 'all' && await shopService.getShopId(address);
        const brand_id = brand_name !== 'all' && await brandService.getBrandId(brand_name);
        let orders = [];

        if (brand_name === 'all') {
            // file_name = `Усі замовлення на ${address}`;
            file_name = `All orders for shop ${shop_id}`;
            orders = await Orders.findAll({where: {shop_id: shop_id}});
        } else if (address === 'all') {
            file_name = `All orders for brand ${brand_name}`;
            orders = await Orders.findAll({where: {brand_id: brand_id}});
        } else {
            file_name = `Order for shop ${shop_id} brand ${brand_name}`;
            orders = await Orders.findAll({where: {brand_id: brand_id, shop_id: shop_id}})
        }

        let details = await orderService.getOrdersDetails(orders);
        const excel = await orderService.jsonToExcel(details, file_name)

        const stream = fs.createReadStream(excel.file_path);

        // res.setHeader(
        //     "Content-Type",
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        // )
        // res.setHeader('Content-Disposition', `attachment; filename='${excel.file_name}'`)
        // stream.pipe(res)
        res.setHeader('Content-Disposition', `attachment; filename=${excel.file_name}`);
        res.end(xlsx.write(excel.work_book, {type: "buffer", bookType: 'xlsx'}));

    }

    async getAllOrdersForOrder(req, res) {
        const orders_for_order = await ProductsForOrder.findAll();
        let products_for_order_details = [];
        for (let order of orders_for_order) {
            const {shop_id, brand_id, order_date, order_status, id} = order;
            const order_details = await ProductsForOrderDetails.findAll({where: {order_id: id}});
            const brand_name = await brandService.getBrandName(brand_id);
            const shop_address = await shopService.getShopName(shop_id);
            products_for_order_details.push({
                order_id: id,
                brand_name,
                shop_address,
                order_date,
                order_status,
                order_details
            });
        }

        return res.json(products_for_order_details);
    }

    // need to simplify next two functions
    async getFilteredOrders(req, res) {
        const {brand_name, address} = req.params;
        let filtered_orders = [];
        if (brand_name === 'all' && address === 'all') {
            filtered_orders = await Orders.findAll()
        } else if (brand_name === 'all') {
            const shop_id = await shopService.getShopId(address);
            filtered_orders = await Orders.findAll({where: {shop_id: shop_id}});
        } else if (address === 'all') {
            const brand_id = await brandService.getBrandId(brand_name);
            filtered_orders = await Orders.findAll({where: {brand_id: brand_id}})
        } else {
            const brand_id = await brandService.getBrandId(brand_name);
            const shop_id = await shopService.getShopId(address);
            filtered_orders = await Orders.findAll({where: {brand_id: brand_id, shop_id: shop_id}})
        }
        filtered_orders = await orderService.getOrdersDetails(filtered_orders);
        return res.json(filtered_orders);
    }

    async getFilteredOrdersForOrder(req, res) {
        const {brand_name, address} = req.params;
        let filtered_orders = [];
        if (brand_name === 'all' && address === 'all') {
            filtered_orders = await ProductsForOrder.findAll()
        } else if (brand_name === 'all') {
            const shop_id = await shopService.getShopId(address);
            filtered_orders = await ProductsForOrder.findAll({where: {shop_id: shop_id}});
        } else if (address === 'all') {
            const brand_id = await brandService.getBrandId(brand_name);
            filtered_orders = await ProductsForOrder.findAll({where: {brand_id: brand_id}})
        } else {
            const brand_id = await brandService.getBrandId(brand_name);
            const shop_id = await shopService.getShopId(address);
            filtered_orders = await ProductsForOrder.findAll({where: {brand_id: brand_id, shop_id: shop_id}})
        }
        filtered_orders = await orderService.getOrdersDetails(filtered_orders);
        return res.json(filtered_orders);
    }
}

module.exports = new controller();
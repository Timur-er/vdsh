const {
    Orders,
    OrderDetails,
    ropesBrand,
    ProductsForOrder,
    ProductsForOrderDetails,
    ShopAddresses
} = require('../models/models');
const orderService = require('../service/order-service');
const ropesService = require('../service/ropes-service');
const brandService = require('../service/brand-service');
const shopService = require('../service/shop-service');
const xlsx = require("xlsx");
const fs = require("fs");

class controller {
    async createOrder(req, res) {
        try {
            const {user_id, shop_id, brand_id, orderDetails} = req.body;

            let date = new Date();
            date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

            const createOrder = await Orders.create({
                user_id,
                shop_id,
                brand_id,
                order_status: 'active',
                order_date: date
            });
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

        } catch (e) {
            console.log(e);
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Orders.findAll();
            const responseData = [];
            for (let order of orders) {
                const {id, brand_id, order_status, order_date, shop_id} = order;
                const brandData = await ropesBrand.findOne({where: {id: brand_id}});
                const {brandName} = brandData;
                const orderDetails = await OrderDetails.findAll({where: {order_id: id}});

                const shopData = await ShopAddresses.findOne({where: {id: shop_id}})

                const shop_address = shopData.address;
                const orderData = {order_id: id, brandName, order_status, shop_address, order_date, orderDetails};
                responseData.push(orderData);
            }
            return res.json(responseData);
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
        const orderData = await orderService.getOrderById(order_id);
        const workBook = xlsx.utils.book_new();
        const workSheet = xlsx.utils.json_to_sheet(orderData.order); //here we need to give data
        // xlsx.utils.book_append_sheet(workBook, workSheet, `Заказ на ${orderData.shop_name} производитель ${orderData.order_id}`);
        xlsx.utils.book_append_sheet(workBook, workSheet, `Заказ на x производитель ${orderData.order_id}`);

        // const fileName = `Заказ для ${orderData.shop_name}.xlsx`;
        const fileName = `Заказ для x.xlsx`;
        const workBookOptions = {bookType: 'xlsx', type: 'binary'};
        xlsx.writeFile(workBook, fileName, workBookOptions);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        const stream = fs.createReadStream(fileName);
        stream.pipe(res)
    }

    async getAllOrdersForOrder(req, res) {
        const ordersForOrder = await ProductsForOrder.findAll();
        let productsForOrderDetails = [];
        for (let order of ordersForOrder) {
            const {shop_id, brand_id, id} = order;
            const orderDetails = await ProductsForOrderDetails.findAll({where: {products_for_order_id: id}});
            const brand_name = await brandService.getBrandName(brand_id);
            const shop_name = await shopService.getShopName(shop_id);
            productsForOrderDetails.push({brand_name, shop_name, order_details: orderDetails});
        }

        return res.json(productsForOrderDetails);
    }
}

module.exports = new controller();
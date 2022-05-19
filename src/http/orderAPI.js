import {$authHost, $host, $downloadFile} from "./index";
import order from "../Components/Order/Order";

export const createOrder = async (user_id, shop_id, brand_id, orderDetails) => {
    try {
        const order = await $host.post('api/order/createOrder', {user_id, shop_id, brand_id, orderDetails})
        return order;
    } catch (e) {
        console.log(e);
    }
}

export const getOrderByUser = async (user_id) => {
    try {
        const orders = await $host.get(`api/order/getOrderByUser/${user_id}`);
        return orders;
    } catch (e) {
        console.log(e);
    }
}

export const getOrderByShop = async (shop_id) => {
    try {
        const orders = await $host.get(`api/order/getOrderByShop/${shop_id}`);
        return orders;
    } catch (e) {
        console.log(e);
    }
}

export const getProductsForOrderByBrand = async () => {
    try {
        const orders = await $host.get('api/order/getProductsForOrderByBrand');
        return orders;
    } catch (e) {
        console.log(e);
    }
}

export const getFilteredOrder = async (brand_id, shop_id) => {
    try {
        const orders = await $host.get('api/order/getFilteredOrders/');
        return orders;
    } catch (e) {
        console.log(e);
    }
}

export const getAllOrders = async () => {
    try {
        const orders = await $authHost.get('api/order/getAllOrders');
        return orders;
    } catch (e) {
        console.log(e);
    }
}

export const getExcel = async (order_id) => {
    try {
        // const table = await $host.post('api/order/getExcelFile', {data});
        const response = await $downloadFile.get(`api/order/getExcelFile/${order_id}`);
        const blob = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
        console.log(blob);
        const href = URL.createObjectURL(blob)
        const a = Object.assign(document.createElement("a"), {
            href,
            style: 'display: none',
            download: `заказ № ${order_id}`
        })
        document.body.appendChild(a);
        a.click()
        URL.revokeObjectURL(href);
    } catch
        (e) {
        console.log(e);
    }
}

export const getAllOrdersForOrder = async () => {
    try {
        const response = await $authHost.get('api/order/getAllOrdersForOrder');
        return response;
    } catch (e) {
        console.log(e);
    }
}
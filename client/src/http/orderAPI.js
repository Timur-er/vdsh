import {$authHost, $host, $downloadFile} from "./index";
import order from "../Components/Order/Order";

export const createOrder = async (user_id, shop_id, brand_id, order_details) => {
    try {
        const order = await $host.post('api/order/createOrder', {user_id, shop_id, brand_id, order_details})
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
        const orders = await $host.get(`api/order/getFilteredOrders/${shop_id}&${brand_id}`);
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
        const response = await $downloadFile.get(`api/order/getExcelFile/${order_id}`);
        const fileName = response.headers['content-disposition'].substring(22, 51);
        const blob = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        const href = URL.createObjectURL(blob)
        const a = Object.assign(document.createElement("a"), {
            href,
            style: 'display: none',
            download: fileName
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

export const changeOrderStatus = async (order_id, new_status, forOrder) => {
    try {
        const response = await $authHost.post('api/order/changeOrderStatus', {order_id, new_status, forOrder})
        return response;
    } catch (e) {
        console.log(e);
    }
}
import {$host} from "./index";

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
import {$host} from "./index";

export const getAllShops = async () => {
    try {
        const shops = await $host.get('/api/shop/getAllShops')
        return shops;
    } catch (e) {
        console.log(e);
    }
}
import {$authHost, $host} from "./index";

export const addProducts = async (order, brand_name) => {
    try {
        const brand = await $host.get(`api/products/getBrandId/${brand_name}`);
        const addRopesOrder = await $host.post('api/products/addProducts', {order, brand_id: brand.data[0].id});
        return addRopesOrder;
    } catch (e) {
        console.log(e.message);
    }
};

 export const filterByProductId = async (id) => {
     try {

     } catch (e) {
         console.log(e);
     }
}

export const getAllProducts = async () => {
    const ropes = await $host.get('api/products/getAllProducts');
    return ropes;
};

export const getAllBrands = async () => {
    const brands = await $host.get('api/products/getAllBrands');
    return brands;
}

export const getProductsByBrand = async (brand_id) => {
    try {
        const ropes = await $host.get(`api/products/getAllProductsByBrand/${brand_id}`);
        return ropes;
    } catch (e) {
        console.log(e);
    }
}

export const addProductBrand = async (brand_name) => {
    try {
        const brand = await $authHost.post('api/products/addProductBrand', {brand_name})
        return brand;
    } catch (e) {
        console.log(e);
    }
}

export const changeProductInfo = async (prev_product_id, new_product_id, quantity, brand_id) => {
    try {
        const res = await $authHost.post(`api/products/changeProductInfo/${prev_product_id}&${new_product_id}&${quantity}&${brand_id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}
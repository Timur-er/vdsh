import {$host} from "./index";

export const addRopes = async (order, brandName) => {
    try {
        const addBrandName = await $host.post('api/ropes/addRopeBrand', {brandName});
        const addRopesOrder = await $host.post('api/ropes/addRopesItems', {order, brandId: addBrandName.data});
        return addRopesOrder;
    } catch (e) {
        console.log(e.message);
    }
};

export const getAllRopes = async () => {
    const ropes = await $host.get('api/ropes/getAllRopes');
    return ropes;
};

export const getAllRopesBrand = async () => {
    const brands = await $host.get('api/ropes/getAllBrands');
    return brands;
}

export const getRopesByBrand = async (brandId) => {
    try {
        const ropes = await $host.get(`api/ropes/getAllRopesByBrand/${brandId}`);
        return ropes;
    } catch (e) {
        console.log(e);
    }
}
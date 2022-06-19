import {addRopeBrandToOrder, addRopeToOrder, addShopId, removeRopeFromOrder} from "./actions";

export const addRopeOrder = (color_id, quantity, ropesOrder) => dispatch => {
    if (ropesOrder) {
        dispatch(addRopeToOrder(color_id, quantity))
    }
}

export const ropesOrderOperation = (order, color_id, quantity) => dispatch => {
    if (order.length >= 0) {
        order = order.filter((item) => {
            return item.color_id !== color_id
        });
        if (quantity === 0) {
            console.log(order);
            dispatch(removeRopeFromOrder([...order]));
        } else {
            dispatch(addRopeToOrder([...order, {color_id, quantity}]));
        }
    } else {
        dispatch(addRopeToOrder([{color_id, quantity}]));
    }
}

export const setAddressOperation = () => dispatch => {

}

export const setOrderBrandOperation = (brand, id) => dispatch => {
    dispatch(addRopeBrandToOrder({brand, id}))
}

export const setShopAddressOperation = (shop_id) => dispatch => {
    dispatch(addShopId(shop_id));
}
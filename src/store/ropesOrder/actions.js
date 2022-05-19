import {ADD_ROPE_BRAND_TO_ORDER, ADD_ROPE_TO_ORDER, ADD_SHOP_ID, REMOVE_ROPE_FROM_ORDER, CLEAR_ORDER} from "./types";

export const addRopeToOrder = order => ({type:ADD_ROPE_TO_ORDER, payload: order});
export const removeRopeFromOrder = order => ({type: REMOVE_ROPE_FROM_ORDER, payload: order});
export const addRopeBrandToOrder = brandData => ({type: ADD_ROPE_BRAND_TO_ORDER, payload: brandData});
export const addShopId = shop_id => ({type: ADD_SHOP_ID, payload: shop_id});
export const clearOrder = () => ({type: CLEAR_ORDER, payload:[]})
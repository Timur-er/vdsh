import initialStore from "../initialStore";
import {SET_ORDERS} from "./types";

export function ordersReducer (orders = initialStore.orders, action) {
    switch (action.type) {
        case SET_ORDERS:
            return [...action.payload]
        default:
            return orders;
    }
}
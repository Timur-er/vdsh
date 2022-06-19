import {
    CREATE_ROPES_ORDER,
    ADD_ROPE_TO_ORDER,
    REMOVE_ROPE_FROM_ORDER,
    ADD_ROPE_BRAND_TO_ORDER,
    ADD_SHOP_ID, CLEAR_ORDER
} from "./types";
import initialStore from "../initialStore";

export function ropesOrderReducer (ropesOrder = initialStore.ropesOrder, action) {
    switch (action.type) {
        case CREATE_ROPES_ORDER:
            return action.payload
        case REMOVE_ROPE_FROM_ORDER:
            return {...ropesOrder, order: [...action.payload]}
        case ADD_ROPE_TO_ORDER:
            return {...ropesOrder, order: [...action.payload]}
        case ADD_ROPE_BRAND_TO_ORDER:
            return {...ropesOrder, brand_data: action.payload}
        case ADD_SHOP_ID:
            return {...ropesOrder, shop_id: action.payload}
        case CLEAR_ORDER:
            return {...ropesOrder, order: action.payload}
        default:
            return ropesOrder
    }
}
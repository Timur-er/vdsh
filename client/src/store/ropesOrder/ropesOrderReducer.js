import {
    CREATE_ROPES_ORDER,
    ADD_ROPE_TO_ORDER,
    REMOVE_ROPE_FROM_ORDER,
    ADD_ROPE_BRAND_TO_ORDER,
    ADD_SHOP_ID
} from "./types";
import initialStore from "../initialStore";

export function ropesOrderReducer (ropesOrder = initialStore.ropesOrder, action) {
    switch (action.type) {
        case CREATE_ROPES_ORDER:
            return action.payload
        case REMOVE_ROPE_FROM_ORDER:
            return {...ropesOrder, order: [...action.payload]}
        case ADD_ROPE_TO_ORDER:
            // return action.payload
            return {...ropesOrder, order: [...action.payload]}
            // return {...ropesOrder, order: [...action.payload]}
        case ADD_ROPE_BRAND_TO_ORDER:
            return {...ropesOrder, brandData: action.payload}
        case ADD_SHOP_ID:
            return {...ropesOrder, shop_id: action.payload}
        default:
            return ropesOrder
    }
}
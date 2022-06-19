import initialStore from "../initialStore";
import {CLOSE_MODAL, OPEN_MODAL} from "./types";

export function modalReducer (modal = initialStore.modal, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {is_open: action.payload}
        case CLOSE_MODAL:
            return {is_open: action.payload}
        default:
            return modal
    }
}
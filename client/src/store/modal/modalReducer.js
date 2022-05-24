import initialStore from "../initialStore";
import {CLOSE_MODAL, OPEN_MODAL} from "./types";

export function modalReducer (modal = initialStore.modal, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {isOpen: action.payload}
        case CLOSE_MODAL:
            return {isOpen: action.payload}
        default:
            return modal
    }
}
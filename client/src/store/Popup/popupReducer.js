import initialStore from "../initialStore";
import {CLOSE_POPUP, OPEN_POPUP} from "./types";

export function popupReducer (popup = initialStore.popup, action) {
    switch (action.type) {
        case OPEN_POPUP:
            return {message: action.payload.message, is_open: action.payload.is_open, is_error: action.payload.is_error}
        case CLOSE_POPUP:
            return initialStore.popup;
        default:
            return popup;
    }
}
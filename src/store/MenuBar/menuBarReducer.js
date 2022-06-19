import {MENU_BAR_TOGGLE} from "./types";
import initialStore from "../initialStore";

export function menuBarReducer(menu = initialStore.menu, action) {
    switch (action.type) {
        case MENU_BAR_TOGGLE:
            return {...menu, is_open: action.payload};
        default:
            return menu;
    }
}
import {CLOSE_POPUP, OPEN_POPUP} from "./types";

export const openPopup = (message, is_error) => ({type: OPEN_POPUP, payload: {is_open: true, message, is_error} });
export const closePopup = () => ({type: CLOSE_POPUP, payload: false});

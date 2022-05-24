import {CLOSE_MODAL, OPEN_MODAL} from "./types";

export const openModal = isOpen => ({type: OPEN_MODAL, payload: isOpen})
export const closeModal = isOpen => ({type: CLOSE_MODAL, payload: isOpen})
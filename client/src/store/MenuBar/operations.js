import {menuBarToggleAction} from "./actions";

export const menuBarToggleOperation = (isOpen) => dispatch => {
    dispatch(menuBarToggleAction(isOpen))
};
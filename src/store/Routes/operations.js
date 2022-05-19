import {addRoutesAction} from "./actions";

export const addRoutesOperation = (routes) => dispatch => {
    dispatch(addRoutesAction(routes));
}
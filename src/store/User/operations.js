import {loginUser} from "./actions";

export const loginUserOperation = (user_id, email, name, surname, shop_id, role, token, is_activated) => dispatch => {
    const user = {user_id, email, name, surname, shop_id, role, token, is_auth: true, is_activated}
    dispatch(loginUser(user));
}
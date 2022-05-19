import {loginUser} from "./actions";

export const loginUserOperation = (user_id, email, name, surname, shop_id, role, token, isActivated) => dispatch => {
    const user = {user_id, email, name, surname, shop_id, role, token, isAuth: true, isActivated}
    dispatch(loginUser(user));
}
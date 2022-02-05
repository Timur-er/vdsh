import {loginUser} from "./actions";

export const loginUserOperation = (user_id, email, name, surname, shop_id, token, isActivated) => dispatch => {
    const user = {user_id, email, name, surname, shop_id, token, isAuth: true, isActivated}
    dispatch(loginUser(user));
}

export const checkAuthOperation = () => dispatch => {
    const token = localStorage.getItem('token');

}
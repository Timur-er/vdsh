import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {loginUserOperation} from "../store/User/operations";
import {getNewAccessTokenAPI} from "../http/userAPI";

export const useAuth = () => {
    const dispatch = useDispatch();

    const login = useCallback( (user_id, email, name, surname, shop_id, role, jwt_token, is_activated) => {
        dispatch(loginUserOperation(user_id, email, name, surname, shop_id, role, jwt_token, is_activated))
        localStorage.setItem('jwt_token', JSON.stringify(jwt_token));
    }, [dispatch])

    useEffect( () => {
        async function refreshUserData() {
            const token = JSON.parse(localStorage.getItem('jwt_token'));
            if (token) {
                const new_access_token = await getNewAccessTokenAPI();
                const newToken = new_access_token.data.access_token;
                const {user_id, email, name, surname, role, shop_id, is_activated} = new_access_token.data.user;
                login(user_id, email, name, surname, shop_id, role, newToken, is_activated);
            }
        }
       refreshUserData();
    }, [login])

    return {login}
}
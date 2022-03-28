import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {loginUserOperation} from "../store/User/operations";
import {getNewAccessTokenAPI} from "../http/userAPI";

export const useAuth = () => {
    const dispatch = useDispatch();

    const login = useCallback( (user_id, email, name, surname, shop_id, role, jwtToken, isActivated) => {
        dispatch(loginUserOperation(user_id, email, name, surname, shop_id, role, jwtToken, isActivated))
        localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
    }, [dispatch])

    useEffect( () => {
        async function refreshUserData() {
            const token = JSON.parse(localStorage.getItem('jwtToken'));
            if (token) {
                const newAccessToken = await getNewAccessTokenAPI();
                const newToken = newAccessToken.data.accessToken;
                const {user_id, email, name, surname, role, shop_id, isActivated} = newAccessToken.data.user;
                login(user_id, email, name, surname, shop_id, role, newToken, isActivated);
            }
        }
       refreshUserData();
    }, [login])

    return {login}
}
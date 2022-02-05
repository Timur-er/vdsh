import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
// import {loginUser} from "../store/User/actions";
import {loginUserOperation} from "../store/User/operations";
import {getNewAccessTokenAPI} from "../http/userAPI";

export const useAuth = () => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [shop_id, setShopId] = useState();
    const [token, setToken] = useState();
    const [isActivated, setIsActivated] = useState(false)
    const dispatch = useDispatch();

    const login = useCallback( (user_id, email, name, surname, shop_id, jwtToken, isActivated) => {
        setEmail(email);
        setName(name);
        setSurname(surname);
        setShopId(shop_id);
        setToken(jwtToken);
        setIsActivated(isActivated)

        dispatch(loginUserOperation(user_id, email, name, surname, shop_id, jwtToken, isActivated))
        localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
    }, [])

    useEffect(async () => {
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        if (token) {
            const newAccessToken = await getNewAccessTokenAPI();
            const newToken = newAccessToken.data.accessToken;
            const {user_id, email, name, surname, shop_id, isActivated} = newAccessToken.data.user;
            login(user_id, email, name, surname, shop_id, newToken, isActivated);
        }
    }, [login])

    return {login}
}
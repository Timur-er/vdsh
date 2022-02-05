import React from 'react';
import styles from "./Header.module.scss";
import {NavLink} from "react-router-dom";
import {ADD_ROPES_IN_STOCK_PAGE, ROPES_IN_STOCK_PAGE, AUTH_PAGE, USER_PAGE} from "../../routes/const";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../store/User/selectors";

const Header = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <div>
            <div className={styles.header}>
                <NavLink className={styles.links} to={ADD_ROPES_IN_STOCK_PAGE}>Добавить в наличии</NavLink>
                <NavLink className={styles.links} to={ROPES_IN_STOCK_PAGE}>Нитки в наличии</NavLink>
                {!isAuth && <NavLink className={styles.links} to={AUTH_PAGE}>Войти</NavLink>}
                {isAuth && <NavLink  className={styles.links} to={USER_PAGE}>Личный кабинет</NavLink>}
                {/*<NavLink className={styles.links} to={AUTH_PAGE}>Войти</NavLink>*/}
            </div>
        </div>
    );
};

export default Header;
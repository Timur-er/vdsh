import React, {useEffect, useState} from 'react';
import styles from './NavigationBar.module.scss';
import BurgerBtn from "./BurgerBtn/BurgerBtn";
import {useSelector} from "react-redux";
import {getIsMenuBarOpen} from "../../store/MenuBar/selectors";
import MenuBarLink from "../MenuBarLink/MenuBarLink";
import {getAvailableRoutes} from "../../store/Routes/selectors";
import {useLocation} from "react-router-dom";


const NavigationBar = () => {
    const isMenuOpen = useSelector(getIsMenuBarOpen);
    const [navigationWrapperStyle, setNavigationWrapperStyle] = useState(`${styles.navigation}`);
    const links = useSelector(getAvailableRoutes);
    const location = useLocation();

    useEffect(() => {

        if (isMenuOpen) {
            setNavigationWrapperStyle(`${styles.navigation}`);
        } else {
            setNavigationWrapperStyle(`${styles.navigation} ${styles.navigationClose}`);
        }

    }, [isMenuOpen])

    const renderLinks = links.map((link, i) => {
        const {icon, name, path} = link;
        return (
            <MenuBarLink key={i} icon={icon} path={path} name={name} isActive={location.pathname === path}
                         color={'#ffffff'}/>
        )
    })

    return (
        <nav className={navigationWrapperStyle}>
            <div className={styles.burgerWrapper}>
                <BurgerBtn/>
            </div>

            <ul className={styles.ul}>
                {renderLinks}
            </ul>
        </nav>
    );
};

export default NavigationBar;
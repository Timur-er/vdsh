import React from 'react';
import {NavLink} from "react-router-dom";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import Button from "../../Components/Button/Button";
import {Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import {getChildrenRoutes} from "../../store/Routes/selectors";
import styles from './AddProductsPage.module.scss';

const AddProductsPage = () => {
    const childrenRoutes = useSelector(getChildrenRoutes);

    const renderHeaderLinks = childrenRoutes && childrenRoutes.map(route => {
        const {path, name} = route;
        return (
            <NavLink to={path} key={path}>
                <Button text={name}/>
            </NavLink>
        )
    })

    return (
        <div className={styles.pageContainer}>
            <HeaderButtons>
                {renderHeaderLinks}
            </HeaderButtons>
            <main className={styles.body}>
                <Outlet/>
            </main>
        </div>

    );
};

export default AddProductsPage;
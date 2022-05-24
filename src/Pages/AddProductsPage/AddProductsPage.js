import React from 'react';
import CreateItemField from "../../Components/CreateItemField/CreateItemField";
import styles from './AddProductsPage.module.scss';
import Header from "../../Components/Header/Header";
import Loader from "../../Components/Loader/Loader";
import AddBrand from "../../Components/AddBrand/AddBrand";
import {NavLink} from "react-router-dom";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import Button from "../../Components/Button/Button";
import {ADD_PRODUCTS, ADD_ROPES_IN_STOCK_PAGE} from "../../routes/const";
import {Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import {getChildrenRoutes} from "../../store/Routes/selectors";

const AddProductsPage = () => {
    const childrenRoutes = useSelector(getChildrenRoutes);

    const renderHeaderLinks = childrenRoutes && childrenRoutes.map(route => {
        const {path, name} = route;
        return (
            <NavLink to={path}>
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
import React, {useEffect, useState} from 'react';
import {ADD_ROPES_IN_STOCK_PAGE, AUTH_PAGE, ROPES_IN_STOCK_PAGE, USER_PAGE} from "./const";
import AddProductsPage from "../Pages/AddProductsPage/AddProductsPage";
import RopesInStockPage from "../Pages/RopesInStockPage/RopesInStockPage";
import {Route, Routes} from "react-router-dom";
import Header from "../Components/Header/Header";
import AuthPage from "../Pages/AuthPage/AuthPage";
import UserPage from "../Pages/UserPage/UserPage";
import {useSelector} from "react-redux";
import {getIsAuth} from "../store/User/selectors";

const AppRoutes = () => {
    const isAuth = useSelector(getIsAuth);
    
    return (
        <>
            <Header/>
            <Routes>
                <Route element={<AddProductsPage/>} exact path={ADD_ROPES_IN_STOCK_PAGE}/>
                <Route element={<RopesInStockPage/>} exact path={ROPES_IN_STOCK_PAGE}/>
                <Route element={<AuthPage/>} exact path={AUTH_PAGE}/>
                <Route element={<UserPage/>} exact path={USER_PAGE}/>
            </Routes>
        </>
    );
};

export default AppRoutes;
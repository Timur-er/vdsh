import {
    ADD_ROPES_IN_STOCK_PAGE,
    CHECK_ORDERS_PAGE,
    CREATE_ORDER, PRODUCTS_FOR_ORDER_PAGE,
    USER_LIST_PAGE,
    USER_PAGE
} from "./const";
import AddProductsPage from "../Pages/AddProductsPage/AddProductsPage";
import UserPage from "../Pages/UserPage/UserPage";
import UsersListPage from "../Pages/UsersListPage/UsersListPage";
import OrdersPage from "../Pages/OrdersPage/OrdersPage";
import ProductsForOrderPage from "../Pages/ProductsForOrderPage/ProductsForOrderPage";
import React from "react";
import RopesInStockPage from "../Pages/RopesInStockPage/RopesInStockPage";

export const userRoutes = [
    {
        icon: 'userIcon',
        name: 'Страница пользователя',
        path: USER_PAGE,
        element: <UserPage/>
    },

    {
        icon: 'addOrderIcon',
        name: 'Сделать заказ',
        path: CREATE_ORDER,
        element: <RopesInStockPage />
    }
]

export const managerRoutes = [
    {
        icon: 'uploadDataIcon',
        name: 'Заполнить базу',
        path: ADD_ROPES_IN_STOCK_PAGE,
        element: <AddProductsPage/>
    },
    {
        icon: 'forSendingIcon',
        name: 'Заказы',
        path: CHECK_ORDERS_PAGE,
        element: <OrdersPage />
    },
    {
        icon: 'toOrderIcon',
        name: 'Товары для заказа',
        path: PRODUCTS_FOR_ORDER_PAGE,
        element: <ProductsForOrderPage />
    }
]

export const adminRoutes = [
    {
        icon: 'usersIcon',
        name: 'Пользователи',
        path: USER_LIST_PAGE,
        element: <UsersListPage />
    }
]
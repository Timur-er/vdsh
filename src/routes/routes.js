import {
    ADD_BRAND,
    ADD_PRODUCTS,
    ADD_ROPES_IN_STOCK_PAGE, ADD_SHOP,
    CHECK_ORDERS_PAGE,
    CREATE_ORDER, PRODUCTS_FOR_ORDER_PAGE,
    USER_LIST_PAGE,
    USER_PAGE
} from "./const";
import AddProductsPage from "../Pages/AddProductsPage/AddProductsPage";
import UserPage from "../Pages/UserPage/UserPage";
import UsersListPage from "../Pages/UsersListPage/UsersListPage";
import ToDeliverPage from "../Pages/ToDeliverPage/ToDeliverPage";
import ProductsForOrderPage from "../Pages/ProductsForOrderPage/ProductsForOrderPage";
import React from "react";
import CreateOrderPage from "../Pages/CreateOrderPage/CreateOrderPage";
import AddBrand from "../Components/AddBrand/AddBrand";
import CreateItemField from "../Components/CreateItemField/CreateItemField";

export const userRoutes = [
    {
        icon: 'userIcon',
        name: 'Головна сторінка',
        path: USER_PAGE,
        element: <UserPage/>,
    },

    {
        icon: 'addOrderIcon',
        name: 'Зробити замовлення',
        path: CREATE_ORDER,
        element: <CreateOrderPage />,
    }
]

export const managerRoutes = [
    {
        icon: 'uploadDataIcon',
        name: 'Заповнити базу даних',
        path: ADD_ROPES_IN_STOCK_PAGE,
        element: <AddProductsPage/>,
        children: [
            {
                name: 'Додати товар',
                path: ADD_PRODUCTS,
                element: <CreateItemField />,
            }
        ]
    },
    {
        icon: 'forSendingIcon',
        name: 'Для відправки',
        path: CHECK_ORDERS_PAGE,
        element: <ToDeliverPage />,
    },
    {
        icon: 'toOrderIcon',
        name: 'Для замовлення',
        path: PRODUCTS_FOR_ORDER_PAGE,
        element: <ProductsForOrderPage />,
    }
]

export const adminRoutes = [
    {
        icon: 'usersIcon',
        name: 'Користувачі',
        path: USER_LIST_PAGE,
        element: <UsersListPage />,
    }
]
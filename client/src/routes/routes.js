import {
    ADD_PRODUCTS,
    ADD_ROPES_IN_STOCK_PAGE,
    CHECK_ORDERS_PAGE,
    CREATE_ORDER, PRODUCTS_FOR_ORDER_PAGE,
    USER_LIST_PAGE,
    USER_PAGE,
    CHECK_DATA_BASE
} from "./const";
import AddProductsPage from "../Pages/AddProductsPage/AddProductsPage";
import UserPage from "../Pages/UserPage/UserPage";
import UsersListPage from "../Pages/UsersListPage/UsersListPage";
import ToDeliverPage from "../Pages/ToDeliverPage/ToDeliverPage";
import React from "react";
import CreateOrderPage from "../Pages/CreateOrderPage/CreateOrderPage";
import CreateItemField from "../Components/CreateItemField/CreateItemField";
import DataBasePage from "../Pages/DataBasePage/DataBasePage";

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
            },
            {
                name: 'Відкрити базу',
                path: CHECK_DATA_BASE,
                element: <DataBasePage />
            }
        ]
    },
    {
        icon: 'forSendingIcon',
        name: 'Для відправки',
        path: CHECK_ORDERS_PAGE,
        element: <ToDeliverPage />,
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
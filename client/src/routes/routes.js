import {ADD_ROPES_IN_STOCK_PAGE, ROPES_IN_STOCK_PAGE} from "./const";
import AddProductsPage from "../Pages/AddProductsPage/AddProductsPage";
import OrderPage from "../Pages/OrderPage/OrderPage";


export const privateRoute = [
    {
        name: 'Заполнить базу',
        path: ADD_ROPES_IN_STOCK_PAGE,
        component: `<${AddProductsPage}/>`
    },
    {
        name: 'Сделать заказ',
        path: ROPES_IN_STOCK_PAGE,
        component: OrderPage
    }
]

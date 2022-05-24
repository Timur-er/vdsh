import {combineReducers} from "redux";
import {ropesOrderReducer} from "./ropesOrder/ropesOrderReducer";
import {userReducer} from "./User/userReducer";
import {menuBarReducer} from "./MenuBar/menuBarReducer";
import {routesReducer} from "./Routes/routesReducer";
import {brandsReducer} from "./Brands/brandsReducer";
import {modalReducer} from "./modal/modalReducer";
import {ordersReducer} from "./Orders/ordersReducer";

const rootReducer = combineReducers({
    ropesOrder: ropesOrderReducer,
    user: userReducer,
    menu: menuBarReducer,
    availableRoutes: routesReducer,
    brands: brandsReducer,
    modal: modalReducer,
    orders: ordersReducer
});

export default rootReducer;
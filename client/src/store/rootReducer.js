import {combineReducers} from "redux";
import {ropesOrderReducer} from "./ropesOrder/ropesOrderReducer";
import {userReducer} from "./User/userReducer";
import {menuBarReducer} from "./MenuBar/menuBarReducer";
import {routesReducer} from "./Routes/routesReducer";
import {brandsReducer} from "./Brands/brandsReducer";
import {modalReducer} from "./modal/modalReducer";
import {ordersReducer} from "./Orders/ordersReducer";
import {popupReducer} from "./Popup/popupReducer";

const rootReducer = combineReducers({
    ropesOrder: ropesOrderReducer,
    user: userReducer,
    menu: menuBarReducer,
    availableRoutes: routesReducer,
    brands: brandsReducer,
    modal: modalReducer,
    orders: ordersReducer,
    popup: popupReducer
});

export default rootReducer;
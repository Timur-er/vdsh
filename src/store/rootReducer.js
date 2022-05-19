import {combineReducers} from "redux";
import {ropesOrderReducer} from "./ropesOrder/ropesOrderReducer";
import {userReducer} from "./User/userReducer";
import {menuBarReducer} from "./MenuBar/menuBarReducer";
import {routesReducer} from "./Routes/routesReducer";
import {brandsReducer} from "./Brands/brandsReducer";

const rootReducer = combineReducers({
    ropesOrder: ropesOrderReducer,
    user: userReducer,
    menu: menuBarReducer,
    availableRoutes: routesReducer,
    brands: brandsReducer
});

export default rootReducer;
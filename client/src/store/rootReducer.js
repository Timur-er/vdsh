import {combineReducers} from "redux";
import {ropesOrderReducer} from "./ropesOrder/ropesOrderReducer";
import {userReducer} from "./User/userReducer";

const rootReducer = combineReducers({
    ropesOrder: ropesOrderReducer,
    user: userReducer,
});

export default rootReducer;
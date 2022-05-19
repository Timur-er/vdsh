import {LOGIN_USER, LOGIN_FUNCTIONS} from "./types";
import initialStore from "../initialStore";

export function userReducer (user = initialStore.user, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload
        case LOGIN_FUNCTIONS:
            return {...user, ...action.payload}
        default:
            return user
    }
}
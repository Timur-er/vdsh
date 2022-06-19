import {LOGIN_USER, LOGIN_FUNCTIONS} from "./types";

export const loginUser = user => ({type: LOGIN_USER, payload: user});
export const authFunctionsActions = login => ({type: LOGIN_FUNCTIONS, payload: login})
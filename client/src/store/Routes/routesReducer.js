import {ADD_AVAILABLE_ROUTES} from "./types";
import initialStore from "../initialStore";

export function routesReducer (routes = initialStore.availableRoutes, action) {
    switch (action.type) {
        case ADD_AVAILABLE_ROUTES:
            return [...routes, ...action.payload];
        default:
            return routes;
    }
}
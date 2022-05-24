import initialStore from "../initialStore";
import {SET_BRANDS_LOADING} from './types';

export function brandsReducer(brands = initialStore.brands, action) {
    switch (action.type) {
        case SET_BRANDS_LOADING:
            return {loading: action.payload}
        default:
            return brands;
    }
}
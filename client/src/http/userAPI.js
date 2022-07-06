import {$authHost, $host} from './index';

export const registrationAPI = async (email, name, surname, shop_address, password) => {
    const response = await $host.post('api/user/registration', {email, name, surname, shop_address, password});
    // cookies.set('refresh_token', response.data.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000});
    return response;
}

export const loginAPI = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password}).catch(e => {
        return e.response
    })
    // cookie.set('refresh_token', response.data.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000});
    return response;
}

export const checkAuthAPI = async (token) => {
    const response = await $host.post('api/user/check', {token})
    return response
}

export const getNewAccessTokenAPI = async () => {
    const response = await $host.get('api/user/refresh');
    // cookies.set('refresh_token', response.data.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000});
    return response;
}

export const getAllUsers = async () => {
    const users = await $authHost.get('api/user/getAllUsers');
    return users;
}
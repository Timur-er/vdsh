import {$authHost, $host} from './index';

export const registrationAPI = async (email,name, surname, shopAddress, password) => {
    const response = await $host.post('api/user/registration', {email, name, surname, shopAddress, password});
    return response;
}

export const loginAPI = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password});
    return response;
}

export const checkAuthAPI = async (token) => {
    const response = await $host.post('api/user/check', {token})
    return response
}

export const getNewAccessTokenAPI = async () => {
    const response = await $host.get('api/user/refresh');
    return response;
}
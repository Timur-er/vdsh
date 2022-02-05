import axios from 'axios';

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})


// нужно допилить этот функционал на бэке
const authInterceptor = config => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.jwtToken;
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);
$authHost.interceptors.response.use((config) => {
    return config;
}, (error => {
    if (error.response.status == 401) {
        // to do
    }
}))

export {
    $host,
    $authHost
}
import axios from 'axios';

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
})

const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

const $downloadFile = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    // headers: am I need header here?
    responseType: "blob"
})

// нужно допилить этот функционал на бэке
const authInterceptor = config => {
    const token = JSON.parse(localStorage.getItem('jwtToken'));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);
$authHost.interceptors.response.use((config) => {
    return config;
}, (error => {
    if (error.response.status === 401) {
        console.log('Unauthorized error')
    }
}))

export {
    $host,
    $authHost,
    $downloadFile
}
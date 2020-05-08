import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://59.110.152.103:8087',
        timeout: 10000
    })

    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        return res;
    }, err => {
        console.log(err);
    })

    return instance(config);
}
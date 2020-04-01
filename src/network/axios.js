import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://3w05221j99.wicp.vip:80',
        timeout: 10000
    })

    instance.interceptors.request.use(config => {
        return config;
    },err => {
        console.log(err);
    })

    instance.interceptors.response.use(res => {
        return res;
    },err => {
        console.log(err);
    })

    return instance(config);
}

import { request } from './axios';

// 登录
export function sendLoginMsg(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// 注册
export function sendRegisterMsg(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data: data
    })
}

// 更新用户资料
export function updateInfo(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data: data
    })
}

// 更换头像
export function uploadAvatar(data) {
    return request({
        url: '/user/updateavater',
        method: 'post',
　　　　headers:{
    　　    'Content-Type':'multipart/form-data'
    　　},
        data: data
    })
}

// 签到
export function checkIn(data) {
    return request({
        url: '/user/checkin',
        method: 'post',
        data: data
    })
}

// 查看用户信息
export function checkUser(data) {
    return request({
        url: '/user/seeinfo',
        method: 'post',
        data: data
    })
}
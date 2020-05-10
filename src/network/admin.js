import {
    request
} from './axios';

// 管理员登录
export function adminLogin(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: data
    })
}

// 获取用户列表
export function getListUser(data) {
    return request({
        url: '/admin/listuser',
        method: 'post',
        data: data
    })
}

// 删除用户
export function deleteUser(data) {
    return request({
        url: '/admin/deleteuser',
        method: 'post',
        data: data
    })
}

// 获取问题列表
export function getListQuestion(data) {
    return request({
        url: '/admin/listquestion',
        method: 'post',
        data: data
    })
}

// 删除问题
export function deleteQuestion(data) {
    return request({
        url: '/admin/deletequestion',
        method: 'post',
        data: data
    })
}

// 获取回答列表
export function getListAnswer(data) {
    return request({
        url: '/admin/listanswer',
        method: 'post',
        data: data
    })
}

// 删除回答
export function deleteAnswer(data) {
    return request({
        url: '/admin/deleteanswer',
        method: 'post',
        data: data
    })
}
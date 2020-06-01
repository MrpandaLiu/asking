import {
    request
} from "./axios";

// 创建问题
export function addQuestion(data) {
    return request({
        url: '/question/add',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    })
}

// 首页展示问题
export function showHomeQuestion(data) {
    return request({
        url: '/question/list',
        method: 'post',
        data: data
    })
}

// 删除问题
export function deleteQuestion(data) {
    return request({
        url: '/question/delete',
        method: 'post',
        data: data
    })
}

// 查看问题详情
export function detailQuestion(data) {
    return request({
        url: '/question/detail',
        method: 'post',
        data: data
    })
}

// 查看我的提问
export function myquestion(data) {
    return request({
        url: '/question/myquestion',
        method: 'post',
        data: data
    })
}

// 问题搜索
export function SearchQuestion(data) {
    return request({
        url: '/question/search',
        method: 'post',
        data: data
    })
}

// 添加问题箱
export function addBox(data) {
    return request({
        url: 'questionbox/add',
        method: 'post',
        data: data
    })
}

// 查看自己所有的问题箱
export function boxList(data) {
    return request({
        url: 'questionbox/list',
        method: 'post',
        data: data
    })
}

// 删除问题箱
export function deleteBox(data) {
    return request({
        url: 'questionbox/delete',
        method: 'post',
        data: data
    })
}

// 查看问题箱详情
export function DetailBox(data) {
    return request({
        url: 'questionbox/detail',
        method: 'post',
        data: data
    })
}

// 搜索问题箱
export function SearchBox(data) {
    return request({
        url: 'questionbox/search',
        method: 'post',
        data: data
    })
}
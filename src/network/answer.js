import {request} from './axios';

// 添加回答
export function addAns(data) {
    return request({
        url: '/answer/add',
        method: 'post',
        data: data
    })
}

// 删除回答
export function deleteAns(data) {
    return request({
        url: '/answer/delete',
        method: 'post',
        data: data
    })
}

// 点赞回答
export function thumbAns(data) {
    return request({
        url: '/answer/thumb',
        method: 'post',
        data: data
    })
}

// 我的所有回答
export function myAns(data) {
    return request({
        url: '/answer/myanswer',
        method: 'post',
        data: data
    })
}


// 获取问题对应的回答
export function answerList(data) {
    return request({
        url: '/answer/list',
        method: 'post',
        data: data
    })
}

// 添加问题箱回答
export function addBoxAns(data) {
    return request({
        url: '/boxanswer/add',
        method: 'post',
        data: data
    })
}

// 查看所有问题箱回答
export function boxAnsList(data) {
    return request({
        url: '/boxanswer/list',
        method: 'post',
        data: data
    })
}

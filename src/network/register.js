import { request } from "./request";

export function RegisterUser(params) {
    return request({
        url: '/api/auth/register',
        method: 'post',
        params
    })
}

export function LoginUser(params) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        params
    })
}

export function LogOut(params) {
    return request({
        url: '/api/auth/logout',
        method: 'post',
    })
}

export function getUser() {
    return request({
        url: '/api/user',
        method: 'get',
    })
}
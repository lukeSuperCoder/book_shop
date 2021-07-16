import { request } from "./request";

export function getHomeAllData(params) {
    return request({
        url: '/api/index',
        // method: 'get',
        // params: {

        // }
    })
}

export function getHomeGoods(type = 'sales', page = 1) {
    return request({
        url: '/api/index?'+type+'=1&page='+page
    })
}
import { request } from "./request";

//add order
export function createOrder(params) {
    return request({
        url: '/api/orders',
        method: 'post',
        params
    })
}

export function getOrderPreview() {
    return request({
        url: '/api/orders/preview',
        method: 'get'
    })
}

export function payOrder(id, params) {
    return request({
        url: `/api/orders/${id}/pay`,
        params
    })
}

export function getOrderStatus(id) {
    return request({
        url: `/api/orders/${id}/status`
    })
}

//inlude可以返回额外的数据， 多个使用 ， 分隔， 比如： include=goods,user，orderDetails
export function getOrderList(params) {
    return request({
        url: '/api/orders',
        method: 'get',
        params
    })
}

export function getOrderDetail(id) {
    return request({
        url: `/api/orders/${id}`,
        method: 'get',
        params: {
            include:'user,orderDetails.goods'
        }
    })
}

export function confirmOrder(id) {
    return request({
        url: `/api/orders/${id}/confirm`,
        method: 'patch'
    })
}
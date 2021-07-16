import { request } from "./request";

//add cart
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: 'post',
        data
    })
}

//update cart
export function modifyCart(id, data) {
    return request({
        url: `/api/carts/${id}`,
        method: 'put',
        data
    })
}

//check cart
export function checkedCart(data) {
    return request({
        url: '/api/carts/checked',
        method: 'patch',
        data
    })
}
//get cart list
export function getCart(data='') {
    return request({
        url: '/api/carts?'+data
    })
}
//delete cart
export function deleteCartItem(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'delete'
    })
}
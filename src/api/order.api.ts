import {httpClient, requestHandler} from "./http.ts";
import type {Order, OrderDetailItem, OrderSheet} from "../models/orders.model.ts";

export const order = async (orderData: OrderSheet)=> {
    return await requestHandler('post', "/orders", orderData)
}

export const fetchOrders = async ()=> {
    return await requestHandler('get', "/orders")
}


export const fetchOrder = async (orderId: number)=> {
    return await requestHandler('get', `/orders/${orderId}`)
}
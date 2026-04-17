import {useEffect, useState} from "react";
import type {OrderListItem} from "../models/orders.model.ts";
import {fetchOrder, fetchOrders} from "../api/order.api.ts";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([])
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders)
        })
    }, []);

    const selectOrderItem = (orderId) => {
        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId)
        }

        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId)
            setOrders(
                orders.map((item) => {
                    if (item.id === orderId) {
                        return {
                            ...item,
                            detail: orderDetail
                        }
                    }
                    return item;
                })
            )
        })
    }

    return {orders, selectedItemId, selectOrderItem}
}
import {useEffect, useState} from "react";
import type {Cart} from "../models/cart.model.ts";
import {deleteCart, fetchCart} from "../api/carts.api.ts";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([])
    const [isEmpty, setIsEmpty] = useState(true)

    const deleteCartItem = (id: number) => {
        deleteCart(id).then(() => {
            setCarts(carts.filter((cart) => cart.id !== id))
        })
    }

    useEffect(() => {
        fetchCart().then((carts)=> {
            setCarts(carts)
            setIsEmpty(carts.length === 0)
        })
    }, []);

    return {carts, isEmpty, deleteCartItem}
}
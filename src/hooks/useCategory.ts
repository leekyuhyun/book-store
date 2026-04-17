import {useEffect, useState} from "react";
import {fetchCategory} from "../api/category.api.ts";
import type {Category} from "../models/category.model.ts";
import {useLocation} from "react-router-dom";

export const useCategory = () => {
    const location = useLocation()
    const [category, setCategory] = useState<Category[]>([])

    const setActive = () => {
        const params = new URLSearchParams(location.search)
        const categoryId = params.get("category_id")

        setCategory((prev) => {
            return prev.map((item) => {
                return {
                    ...item,
                    isActive: categoryId
                        ? item.category_id === Number(categoryId)
                        : item.category_id === null
                }
            })
        })
    }

    useEffect(() => {
        fetchCategory().then((category) => {
            if (!category) return

            const categoryWidthAll = [
                {
                    category_id: null,
                    category_name: "전체"
                },
                ...category
            ]

            setCategory(categoryWidthAll)
            setActive()
        })
    }, []);

    useEffect(() => {
        setActive()
    }, [location.search]);

    return {category}
}
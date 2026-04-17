import {httpClient} from "./http.ts";
import type {Category} from "../models/category.model.ts";

export const fetchCategory = async() => {
    const response = await httpClient.get<Category[]>('/category')
    return response.data
}


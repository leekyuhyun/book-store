import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Book} from "../models/book.model.ts";
import type {Pagination} from "../models/pagination.model.ts";
import {fetchBooks} from "../api/books.api.ts";
import {QUERYSTRING} from "../constants/querystring.ts";
import {LIMIT} from "../constants/pagination.ts";
import {useQuery} from "@tanstack/react-query";

export const useBooks = () => {
    const location = useLocation()

    const params = new URLSearchParams(location.search)

    const {data: booksData, isLoading: isBookLoading} = useQuery({
        queryKey: ["books", location.search],
        queryFn: () => fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
            news: params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
            limit: LIMIT,
        })
    })

    return {
        books: booksData?.books,
        pagination: booksData?.pagination,
        isEmpty: booksData?.books.length === 0,
        isBookLoading
    }
}
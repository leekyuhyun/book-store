import {httpClient} from "./http.ts";
import type {Book, BookDetail} from "../models/book.model.ts";
import type {Pagination} from "../models/pagination.model.ts";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>("/books", {
            params: params
        })

        return response.data;
    }
    catch (error) {
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            }
        }
    }
}

export const fetchBook = async (bookId: string) => {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`)

    return response.data
}

export const likeBook = async (bookId: number) => {
    const response = await httpClient.post(`/likes/${bookId}`)
    return response.data;
}

export const unlikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`/likes/${bookId}`)
    return response.data;
}

export const fetchBestBooks = async () => {
    const response = await httpClient.get<Book[]>('/books/best');
    return response.data;
};
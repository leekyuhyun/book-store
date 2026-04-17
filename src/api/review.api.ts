import {httpClient, requestHandler} from "@/api/http.ts";
import type {BookReviewItem, BookReviewItemWrite} from "@/models/book.model.ts";

export const fetchBookReview = async (bookId: string)=> {
    const response = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`)
    return response.data
}

interface AddBookReviewResponse {
    message: string;
}

export const addBookReview = async (bookId: string, data: BookReviewItemWrite) => {
    return await requestHandler<AddBookReviewResponse>("post", `/review/${bookId}`)
}

export const fetchReviewAll = async (): Promise<BookReviewItem[]> => {
    const response = await requestHandler("get", "/reviews")
    return response?.data
}
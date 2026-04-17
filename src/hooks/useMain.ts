import {useEffect, useState} from "react";
import type {Book, BookReviewItem} from "@/models/book.model.ts";
import {fetchReviewAll} from "@/api/review.api.ts";
import {fetchBestBooks, fetchBooks} from "@/api/books.api.ts";
import type {Banner} from "@/models/banner.model.ts";
import {fetchBanners} from "@/api/banner.api.ts";

export const useMain = () => {
    const [reviews, setReviews] = useState<BookReviewItem[]>([])
    const [newBooks, setNewsBooks] = useState<Book[]>([])
    const [bestBooks, setBestBooks] = useState<Book[]>([])
    const [banners, serBanners] = useState(<Banner>[])

    useEffect(() => {
        fetchReviewAll().then((reviews) => {
            setReviews(reviews)
        })
    }, []);

    useEffect(() => {
        fetchBooks({
            category_id:undefined,
            news: true,
            currentPage: 1,
            limit: 4
        }).then(({books}) => {
            setNewsBooks(books)
        })

        fetchBestBooks().then((books) => {
            setBestBooks(books)
        })

        fetchBanners().then((banners) => {
            serBanners(banners)
        })
    }, []);

    return {reviews, newBooks, bestBooks}
}
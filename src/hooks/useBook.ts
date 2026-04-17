import {useEffect, useState} from "react";
import type {BookDetail, BookReviewItem, BookReviewItemWrite} from "../models/book.model.ts";
import {fetchBook, likeBook, unlikeBook} from "../api/books.api.ts";
import {useAuthStore} from "../store/authStore.ts";
import {useAlert} from "./useAlert.ts";
import {addCart} from "../api/carts.api.ts";
import {addBookReview, fetchBookReview} from "@/api/review.api.ts";
import {useToast} from "@/hooks/useToast.ts";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null)
    const [cartAdded, setCartAdded] = useState(false)
    const [review, setReviews] = useState<BookReviewItem>([])
    const {isLoggedIn} = useAuthStore()
    const {showAlert} = useAlert()
    const {showToast} = useToast()

    const likeToggle = () => {
        if (!isLoggedIn) {
            showAlert('로그인이 필요합니다.')
            return
        }

        if (!book) return

        if (book.liked) {
            unlikeBook(book.id).then(() => {
                setBook(
                    {
                        ...book,
                        liked: false,
                        likes: book.likes -1
                    }
                )
            })
            showToast("좋아요가 취소되었습니다.")
        }
        else {
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1
                })
            })
            showToast("좋아요가 성공했습니다.")
        }
    }

    const addToCart = (quantity: number) => {
        if (!book) return

        addCart({
            book_id: book.id,
            quantity: quantity
        }).then(() => {
            setCartAdded(true)
            setTimeout(() => {
                setCartAdded(false)
            }, 3000)
        })
    }

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => {
            setBook(book)
        })

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews)
        })
    }, [bookId]);

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return

        addBookReview(book.id.toString(), data).then((res) => {
            fetchBookReview(book.id.toString()).then((reviews) => {
                setReviews(reviews)
            })
        })
    }

    return {book, likeToggle, addToCart, cartAdded, review, addReview}
}
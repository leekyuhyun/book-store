import {http, HttpResponse} from "msw";
import type {BookReviewItem} from "@/models/book.model.ts";
import { faker } from "@faker-js/faker/locale/ko";

const mockReviewData: BookReviewItem[] = Array.from({length: 8}).map((_, index) =>({
    id: index,
    userName: faker.person.firstName(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({min: 1, max: 5})
}))

export const reviewsById = http.get("http://localhost:8888/reviews/:bookId", () => {
    return HttpResponse.json(mockReviewData, {
        status: 200
    })
})

export const addReview = http.post("http://localhost:8888/reviews/:bookId", () => {
    return HttpResponse.json({
        message: "리뷰가 등록되었습니다."
    },
        {
            status: 200
        })
})
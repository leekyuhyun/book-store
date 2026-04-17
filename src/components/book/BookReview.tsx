import {styled} from "styled-components";
import type {BookReviewItem as IBookReviewItem, BookReviewItemWrite} from "@/models/book.model.ts";
import BookReviewItem from "@/components/book/BookReviewItem.tsx";
import BookReviewAdd from "@/components/book/BookReviewAdd.tsx";

interface Props {
    reviews: IBookReviewItem[],
    onAdd: (data: BookReviewItemWrite) => void
}

export default function BookReview({reviews, onAdd} : Props) {
    return (
        <BookReviewStyle>
            <BookReviewAdd onAdd={onAdd}/>
            {
                reviews.map((review) => (
                    <BookReviewItem key={review.id} review={review}/>
                ))
            }
        </BookReviewStyle>
    )
}

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
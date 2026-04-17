import {styled} from "styled-components";
import type {Book} from "@/models/book.model.ts";
import BookItem from "@/components/books/BookItem.tsx";

interface Props {
    books: Book[];
}

export default function MainNewBooks({books}: Props) {

    return(
        <MainNewBooksStyle>
            {
                books.map((book) => (
                    <BookItem key={book.id} book={book} view="grid"/>
                ))
            }
        </MainNewBooksStyle>
    )
}

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template: repeat(4, 1fr);
  gap: 16px;

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`
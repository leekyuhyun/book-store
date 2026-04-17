import {styled} from "styled-components";
import Title from "../components/common/Title.tsx";
import Button from "../components/common/Button.tsx";
import BooksFilter from "../components/books/BooksFilter.tsx";
import BooksList from "../components/books/BooksList.tsx";
import BooksEmpty from "../components/books/BooksEmpty.tsx";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher.tsx";
import Loading from "@/components/common/Loading.tsx";
import {useBooksInfinite} from "@/hooks/useBooksInfinite.ts";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver.ts";

export default function Books() {
    const { books, pagination, isEmpty, isBooksLoading, fetchNextPage, hasNextPage } = useBooksInfinite();


    const moreRef = useIntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            loadMore()
        }
    })

    const loadMore = () => {
        if (!hasNextPage) return
        fetchNextPage()
    }

    if (isEmpty) {
        return <BooksEmpty />;
    }

    if (!books || !pagination || isBooksLoading) {
        return <Loading />;
    }

    return(
        <>
            <Title size="large">도서 검색 결과</Title>
            <BookStyle>
                <div className="filter">
                    <BooksFilter/>
                    <BooksViewSwitcher/>
                </div>
                {!isEmpty && books && <BooksList books={books}/>}
                {/*{!isEmpty && pagination && <Pagination pagination={pagination}/>}*/}
                <div className="more" ref={moreRef}>
                    <Button size="medium" scheme="normal" onClick={() => fetchNextPage()} disabled={!hasNextPage}>{hasNextPage? '더보기' : '마지막 페이지'}</Button>
                </div>
            </BookStyle>
        </>
    )
}

const BookStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;
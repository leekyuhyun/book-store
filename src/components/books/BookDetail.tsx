import {styled} from "styled-components";
import {Link, useParams} from "react-router-dom";
import {useBook} from "@/hooks/useBook.ts";
import {getImgSrc} from "@/utils/image.ts";
import Title from "../common/Title.tsx";
import type {BookDetail as IBookDetail} from "@/models/book.model.ts";
import {formatDate, formatNumber} from "@/utils/format.ts";
import EllipsisBox from "../common/EllipsisBox.tsx";
import LikeButton from "../book/LikeButton.tsx";
import AddToCart from "../book/AddToCart.tsx";
import BookReview from "@/components/book/BookReview.tsx";
import {Tabs, Tab} from "@/components/common/Tabs.tsx";
import Modal from "@/components/common/Modal.tsx";
import {useState} from "react";

const bookInfoList = [
    {
        label: "카테고리",
        key: "categoryName",
        filter: (book: IBookDetail) => {
            <Link to={`/books?category_id=${book.category_id}`}>{book.categoryName}</Link>
        }
    },
    {
        label: "포맷",
        key: "format"
    },
    {
        label: "페이지",
        key: "page"
    },
    {
        label: "ISBN",
        key: "isbn"
    },
    {
        label: "출간일",
        key: "pubDate",
        filter: (book: IBookDetail) => {
            return formatDate(book.pubDate)
        }
    },
    {
        label: "가격",
        key: "price",
        filter: (book: IBookDetail) => {
            return `${formatNumber(book.price)}원`
        }
    }
]

export default function BookDetail() {
    const {bookId} = useParams()
    const {book, likeToggle, review, addReview} = useBook(bookId)
    const [isModal, setIsModal] = useState(false)

    if (!book) return null

    return (
        <BookDetailStyle>
            <header>
                <div className="img" onClick={() => setIsModal(true)}>
                    <img src={getImgSrc(book.img)} alt={book.title}/>
                </div>
                <Modal isOpen={isModal} onClose={() => setIsModal(false)}><img src={getImgSrc(book.img)} alt={book.title}/></Modal>
                <div className="info">
                    <Title size="large" color="text">{book.title}</Title>
                    {
                        bookInfoList.map((item) => (
                            <dl key={item.key}>
                                <dt>{item.label}</dt>
                                <dd>{item.filter? item.filter(book):book[item.key as keyof IBookDetail]}</dd>
                            </dl>
                        ))
                    }
                </div>
                <p className="summary">{book.summary}</p>
                <div className="like">
                    <LikeButton book={book} onClick={likeToggle}/>
                </div>
                <div className="add-cart">
                    <AddToCart book={book}/>
                </div>
            </header>
            <div className="content">
                <Tabs>
                    <Tab title="상세설명">
                        <Title size="medium">상세 설명</Title>
                        <EllipsisBox linelimit={4} className="detail">
                            {book.detail}
                        </EllipsisBox>
                    </Tab>
                    <Tab title="목차">
                        <Title size="medium">목차</Title>
                        <p className="index">
                            {book.contents}
                        </p>
                    </Tab>
                    <Tab title="리뷰">
                        <Title size="medium">리뷰</Title>
                        <BookReview reviews={review ?? []} onAdd={addReview}/>
                    </Tab>
                </Tabs>
            </div>
        </BookDetailStyle>
    )
}

const BookDetailStyle = styled.div`
    header {
      display: flex;
      align-items: start;
      gap: 24px;
      padding: 0 0 24px 0;
      
      .img {
        flex: 1;
        
        img {
          width: 100%;
          height: auto;
        }
      }
      
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        dl {
          display: flex;
          margin: 0;
          
          dt {
            width: 80px;
            color: ${({theme}) => theme.colors.secondary};
          }
          
          a {
            color: ${({theme}) => theme.colors.primary};
          }
        }
      }
    }
`
import {styled} from "styled-components";
import type {BookReviewItem as IBookReviewItem} from "@/models/book.model.ts";
import BookReviewItem from "@/components/book/BookReviewItem.tsx";
import _Slider from "react-slick";
import {useMediaQuery} from "@/hooks/useMediaQuery.ts";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Slider = (_Slider as any).default ?? _Slider;

interface Props {
    reviews: IBookReviewItem[]
}

export default function ManiReview({reviews} : Props) {
    const {isMobile} = useMediaQuery()

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile? 1: 3,
        slidesToScroll: isMobile? 1: 3,
        gap: 16
    }
    return(
        <ManiReviewStyle>
            <Slider {...sliderSettings}>
                {
                    reviews.map((review) => (
                        <BookReviewItem key={review.id} review={review}/>
                    ))
                }
            </Slider>
        </ManiReviewStyle>
    )
}

const ManiReviewStyle = styled.div`
    padding: 0 0 24px 0;
  
  .slick-track {
    padding: 12px 0;
  }
  
  .slick-slide > div {
    margin: 0 12px;
  }
  
  .slide-prev:before,
  .slide-next:before {
    color: #000;
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
  }
`
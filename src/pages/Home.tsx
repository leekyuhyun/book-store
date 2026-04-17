import {styled} from "styled-components";
import {useMain} from "@/hooks/useMain.ts";
import ManiReview from "@/components/home/MainReview.tsx";
import MainNewBooks from "@/components/home/MainNewBooks.tsx";
import Title from "@/components/common/Title.tsx";
import MainBest from "@/components/home/MainBest.tsx";
import {useMediaQuery} from "@/hooks/useMediaQuery.ts";

export default function Home() {
    const {reviews, newBooks, bestBooks, banners} = useMain()
    const {isMobile} = useMediaQuery()

    return(
        <HomeStyle>
            {/*배너*/}

            {/*베스트셀러*/}
            <section className="section">
                <Title size="large">리뷰</Title>
                <MainBest books={bestBooks}/>
            </section>

            {/*신간*/}
            <section className="section">
                <Title size="large">리뷰</Title>
                <MainNewBooks books={newBooks}/>
            </section>

            {/*리뷰*/}
            <section className="section">
                <Title size="large">리뷰</Title>
                <ManiReview reviews={reviews}></ManiReview>
            </section>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

`
import {styled} from "styled-components";
import type {Pagination as IPagination} from "../../models/pagination.model.ts";
import {LIMIT} from "../../constants/pagination.ts";
import Button from "../common/Button.tsx";
import {useSearchParams} from "react-router-dom";
import {QUERYSTRING} from "../../constants/querystring.ts";

interface Props {
    pagination: IPagination;
}

export default function Pagination({pagination} : Props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const {totalCount, currentPage} = pagination;
    const pages: number = Math.ceil(totalCount / LIMIT)

    const handleClickPage = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams)

        newSearchParams.set(QUERYSTRING.PAGE, page.toString())

        setSearchParams(newSearchParams)
    }

    return(
        <PaginationStyle>
            {
                pages > 0 && (
                    <ol>
                        {
                            Array(pages).fill(0).map((_, index) => (
                                <li>
                                    <Button
                                        size="small"
                                        scheme={index + 1 === currentPage ? "primary" : "normal"}
                                        onClick={() => handleClickPage(index + 1)}>{index + 1}</Button>
                                </li>
                            ))
                        }
                    </ol>
                )
            }
        </PaginationStyle>
    )
}

const PaginationStyle = styled.div`
    display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px;
  
  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;
import {styled} from "styled-components";
import type {BookDetail} from "../../models/book.model.ts";
import Button from "../common/Button.tsx";
import {FaHeart} from "react-icons/fa";

interface Props {
    book: BookDetail
    onClick: () => void
}

export default function LikeButton({book, onClick}: Props) {
    return (
        <LikeButtonStyle size="medium" scheme={book.liked? 'like': 'normal'} onClick={onClick}>
            <FaHeart/>
            {book.likes}
        </LikeButtonStyle>
    )
}

const LikeButtonStyle = styled(Button)`
    display: flex;
  gap: 6px;
  
  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;
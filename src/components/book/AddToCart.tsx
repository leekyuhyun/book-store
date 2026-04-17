import {styled} from "styled-components";
import type {BookDetail} from "../../models/book.model.ts";
import InputText from "../common/InputText.tsx";
import Button from "../common/Button.tsx";
import {useState} from "react";
import {addCart} from "../../api/carts.api.ts";
import {useAlert} from "../../hooks/useAlert.ts";
import {Link} from "react-router-dom";

interface Props {
    book: BookDetail
}

export default function AddToCart ({ book }: Props) {
    const [quantity, setQuantity] = useState<number>(1)
    const [cartAdded, setCartAdded] = useState(false)
    const {showAlert} = useAlert()

    const addToCart = (quantity: number) => {
        addCart({
            book_id: book.id,
            quantity: quantity
        }).then(() => {
            showAlert("장바구니에 추가되었습니다.")
            setCartAdded(true)
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleIncress = () => {
        setQuantity(quantity + 1)
    }

    const handleDecrese = () => {
        if (quantity === 1) return
        setQuantity(quantity -1)
    }

    return (
        <AddToCartStyle $added={cartAdded}>
            <InputText inputType="number" value={quantity} onChange={handleChange}/>
            <Button size="medium" scheme="normal" onClick={handleIncress}>+</Button>
            <Button size="medium" scheme="normal" onClick={handleDecrese}>-</Button>
            <Button size="medium" scheme="primary" onClick={() => addToCart(quantity)}>장바구니 담기</Button>
            {
                cartAdded && (
                    <div className="added">
                        <p>장바구니에 추가되었습니다.</p>
                        <Link to="/carts">장바구니로 이동</Link>
                    </div>
                )
            }
        </AddToCartStyle>
    )
}

interface AddToCartStyleProps {
    $added: boolean;

}

const AddToCartStyle = styled.div `
  position: relative;
    display: flex;
  justify-content: space-between;
  align-items: center;
  
  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({theme}) => theme.colors.background};
    border-radius: ${({theme}) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({$added}) => ($added ? "1": "0")};
    transition: all 0.5s ease;
  }
  
  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`
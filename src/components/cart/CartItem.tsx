import {styled} from "styled-components";
import type {Cart} from "../../models/cart.model.ts";
import Button from "../common/Button.tsx";
import Title from "../common/Title.tsx";
import {formatNumber} from "../../utils/format.ts";
import CheckIconButton from "./CheckIconButton.tsx";
import {useMemo} from "react";
import {useAlert} from "../../hooks/useAlert.ts";

interface Props {
    cart: Cart
    checkedItems: number[]
    onCheck: (id: number) => void
    onDelete: (id: number) => void
}

export default function CartItem({cart, checkedItems, onCheck, onDelete} : Props) {
    const isChecked = useMemo(() => {
        return checkedItems.includes(cart.id)
    }, [checkedItems, cart.id])
    const {showConfirm} = useAlert()

    const handleCheck = () => {
        onCheck(cart.id)
    }

    const handleDelete = () => {
        showConfirm("정말 삭제하시겠습니까?", () => {
            onDelete(cart.id)
        })
    }

    return (
        <CartItemStyle>
            <div className="info">
                <div className="check">
                    <CheckIconButton isChecked={isChecked} onCheck={handleCheck}/>
                </div>
                <div>
                    <Title size="medium" color="text">
                        {cart.title}
                    </Title>
                    <p className="summary">{formatNumber(cart.price)}원</p>
                    <p className="quantity">{cart.quantity}</p>
                </div>
            </div>
            <Button size="medium" scheme="normal" onClick={handleDelete}>장바구니 삭제</Button>
        </CartItemStyle>
    )
}

const CartItemStyle = styled.div`
    display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({theme}) => theme.borderRadius.default};
  padding: 12px;
  
  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      margin: 0;
    }
  }
  

`
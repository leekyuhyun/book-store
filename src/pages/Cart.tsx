import Title from "../components/common/Title.tsx";
import Button from "../components/common/Button.tsx";
import {styled} from "styled-components";
import CartItem from "../components/cart/CartItem.tsx";
import {useCart} from "../hooks/useCart.ts";
import {useMemo, useState} from "react";
import Empty from "../components/common/Empty.tsx";
import {FaShoppingCart} from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary.tsx";
import {useAlert} from "../hooks/useAlert.ts";
import type {Order, OrderSheet} from "../models/orders.model.ts";
import {useNavigate} from "react-router-dom";

export default function Cart () {
    const {showAlert, showConfirm} = useAlert()
    const navigate = useNavigate()
    const {carts, isEmpty, deleteCartItem} = useCart()
    const [checkedItems, setCheckedItems] = useState<number[]>([])

    const handleCheckItem = (id: number) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter((item) => item !== id))
        }
        else {
            setCheckedItems([
                ...checkedItems,
                id
            ])
        }
    }

    const handleItemDelete = (id: number) => {
        deleteCartItem(id)
    }

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity
            }

            return acc
        }, 0)
    }, [carts, checkedItems])

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.price * cart.quantity
            }

            return acc
        }, 0)
    }, [carts, checkedItems])

    const handleOrder = () => {
        if (checkedItems.length === 0 ) {
            showAlert("주문할 상품을 선택해 주세요")
            return
        }

        const orderData: Omit<OrderSheet, "delivery"> = {
            items: checkedItems,
            totalPrice,
            totalQuantity,
            firstBookTitle: carts[0].title
        }

        showConfirm("주문하시겠습니까?", () => {
            navigate("/order", {state: orderData})
        })


    }

    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle>
                {
                    !isEmpty && (
                        <>
                            <div className="content">
                                {
                                    carts.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            cart={item}
                                            checkedItems={checkedItems}
                                            onCheck={handleCheckItem}
                                            onDelete={handleItemDelete}
                                        />
                                    ))
                                }
                            </div>
                            <div className="summary">
                                <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice}/>
                                <Button size="large" scheme="primary" onClick={handleOrder}>주문하기</Button>
                            </div>
                        </>
                    )
                }
                {
                    isEmpty && (
                        <Empty title="장바구니가 비었습니다." icon={<FaShoppingCart/>} description="장바구니를 채워주세요"/>
                    )
                }
            </CartStyle>
        </>
    )
}

export const CartStyle = styled.div`
    display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0 0 0;
  
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px ;
  }
  
  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .order-info {
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 12px;
    
    h1 {
      padding: 0 0 24px 0;
    }
  }
  
  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px;
      display: flex;
      justify-content: start;
      gap: 8px;
      
      label {
        width: 80px;
      }
      
      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
    
    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`
import {styled} from "styled-components";
import Title from "../components/common/Title.tsx";
import {useOrders} from "../hooks/useOrders.ts";
import {formatDate, formatNumber} from "../utils/format.ts";
import Button from "../components/common/Button.tsx";
import {useState} from "react";

export default function OrderList() {
    const {orders, selectOrderItem} = useOrders()

    return (
        <div>
            <Title size="large">주문 내역</Title>
            <OrderListStyle>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>주문일자</th>
                        <th>주소</th>
                        <td>수령인</td>
                        <th>전화번호</th>
                        <th>대표상품명</th>
                        <th>수량</th>
                        <th>금액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{formatDate(order.created_at, "YYYY.MM.DD")}</td>
                                    <td>{order.address}</td>
                                    <td>{order.receiver}</td>
                                    <td>{order.contact}</td>
                                    <td>{order.book_title}</td>
                                    <td>{order.total_quantity}권</td>
                                    <td>{formatNumber(order.total_price)}원</td>
                                    <td><Button size="small" scheme="normal" onClick={() => selectOrderItem(order.id)}>자세히</Button></td>
                                </tr>

                                {
                                    selectOrderItem === order.id && (
                                        <tr>
                                            <td></td>
                                            <td colSpan={8}>
                                                <ul className="detail">
                                                    {
                                                        order?.detail && order?.detail.map((item) => (
                                                            <li key={item.bookId}>
                                                                <div>
                                                                    <span>{item.bookId}</span>
                                                                    <span>{item.author}</span>
                                                                    <span>{formatNumber(item.price)}원</span>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </OrderListStyle>
        </div>
    )
}

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;
  
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({theme}) => theme.colors.border};
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
  }
  
  th, td {
    padding: 16px;
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
    text-align: center;
  }
  
  .detail {
    margin: 0;
    
    li {
      list-style: none;
      text-align: center;
      
      div {
        display: flex;
        padding: 8px 12px;
        gap: 8px;
      }
    }
  }
`
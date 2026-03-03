import conn from "../db/mysql_connect.js";
import { StatusCodes } from "http-status-codes";

export const order = async (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  const promiseConn = conn.promise();

  try {
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await promiseConn.execute(sql, values);
    const delivery_id = results.insertId;

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
           VALUES (?, ?, ?, ?, ?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await promiseConn.execute(sql, values);
    const order_id = results.insertId;

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    const itemValues = items.map((item) => [
      order_id,
      item.book_id,
      item.quantity,
    ]);
    await promiseConn.query(sql, [itemValues]);

    const cartIds = items.map((item) => item.cart_id);
    await deleteCartItems(promiseConn, cartIds);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "주문 완료 및 장바구니가 비워졌습니다.", order_id });
  } catch (err) {
    console.error("주문 처리 중 에러 발생:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export const deleteCartItems = async (promiseConn, cartIds) => {
  const sql = `DELETE FROM cart WHERE cart_id IN (?)`;
  const [result] = await promiseConn.query(sql, [cartIds]);
  return result;
};

export const getOrders = async (req, res) => {
  const promiseConn = conn.promise();

  try {
    const sql = `
      SELECT 
        orders.order_id, 
        orders.book_title, 
        orders.total_quantity, 
        orders.total_price, 
        orders.created_at, 
        delivery.address, 
        delivery.receiver, 
        delivery.contact 
      FROM orders 
      LEFT JOIN delivery ON orders.delivery_id = delivery.delivery_id

    `;

    const [results] = await promiseConn.execute(sql);

    return res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error("주문 목록 조회 중 에러:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const promiseConn = conn.promise();

  try {
    const sql = `
      SELECT 
        orderedBook.book_id, 
        books.title AS book_title, 
        books.author, 
        books.price, 
        orderedBook.quantity 
      FROM orderedBook
      LEFT JOIN books ON orderedBook.book_id = books.book_id
      WHERE orderedBook.order_id = ?
    `;

    const [results] = await promiseConn.execute(sql, [id]);

    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "해당 주문의 상세 내역을 찾을 수 없습니다.",
      });
    }

    return res.status(StatusCodes.OK).json(results);
  } catch (err) {
    console.error("주문 상세 조회 중 에러:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

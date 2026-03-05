import conn from "../db/mysql_connect.js";
import { Authorization, handleAuthError } from "../utils/auth.js";
import { StatusCodes } from "http-status-codes";

export const order = async (req, res) => {
  try {
    const promiseConn = conn.promise();
    const auth = Authorization(req);

    const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
      req.body;

    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await promiseConn.execute(sql, values);
    const delivery_id = results.insertId;

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
           VALUES (?, ?, ?, ?, ?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, auth.id, delivery_id];
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
  } catch (error) {
    console.error("주문 처리 중 에러:", error);

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const { status, message, code } = handleAuthError(error);
      return res.status(status).json({ message, code });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "주문 처리 중 에러가 발생했습니다.",
      error: error.message,
    });
  }
};

export const deleteCartItems = async (promiseConn, items) => {
  const sql = `DELETE FROM cart WHERE cart_id IN (?)`;
  const [result] = await promiseConn.query(sql, [items]);
  return result;
};

export const getOrders = async (req, res) => {
  try {
    const promiseConn = conn.promise();
    const auth = Authorization(req);

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
      WHERE orders.user_id = ?
    `;

    const [results] = await promiseConn.execute(sql, [auth.id]);

    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    console.error("주문 목록 조회 중 에러:", error);

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const { status, message, code } = handleAuthError(error);
      return res.status(status).json({ message, code });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "주문 목록 조회 중 에러가 발생했습니다.",
      error: error.message,
    });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = Authorization(req);
    const promiseConn = conn.promise();

    const sql = `
      SELECT 
        orderedBook.book_id, 
        books.title AS book_title, 
        books.author, 
        books.price, 
        orderedBook.quantity 
      FROM orderedBook
      LEFT JOIN books ON orderedBook.book_id = books.book_id
      WHERE orderedBook.order_id = ? AND orderedBook.order_id IN (
        SELECT order_id FROM orders WHERE user_id = ?
      )
    `;

    const [results] = await promiseConn.execute(sql, [id, auth.id]);

    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "해당 주문의 상세 내역을 찾을 수 없습니다.",
      });
    }

    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    console.error("주문 상세 조회 중 에러:", error);

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const { status, message, code } = handleAuthError(error);
      return res.status(status).json({ message, code });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "주문 상세 조회 중 에러가 발생했습니다.",
      error: error.message,
    });
  }
};

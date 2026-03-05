import conn from "../db/mysql_connect.js";
import { StatusCodes } from "http-status-codes";
import { Authorization, handleAuthError } from "../utils/auth.js";

export const addCart = (req, res) => {
  try {
    const { book_id, quantity } = req.body;
    const auth = Authorization(req);

    const sql =
      "INSERT INTO cart (book_id, quantity, user_id) VALUES (?, ?, ?)";
    const values = [book_id, quantity, auth.id];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error("장바구니 담기 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "장바구니 담기에 실패했습니다.",
          error: err.message,
        });
      }
      return res.status(StatusCodes.CREATED).json({
        message: "장바구니에 추가되었습니다.",
        result: results,
      });
    });
  } catch (error) {
    console.error("장바구니 담기 에러:", error);
    const { status, message, code } = handleAuthError(error);
    return res.status(status).json({ message, code });
  }
};

export const getCartItems = (req, res) => {
  try {
    const { selected } = req.body || {};
    const auth = Authorization(req);

    let sql = `
      SELECT 
          cart.cart_id, 
          cart.book_id, 
          books.title, 
          books.summary, 
          cart.quantity, 
          books.price 
      FROM cart 
      LEFT JOIN books ON cart.book_id = books.book_id
      WHERE cart.user_id = ?`;

    let values = [auth.id];

    if (selected && selected.length > 0) {
      sql += ` AND cart.cart_id IN (?)`;
      values.push(selected);
    }

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error("장바구니 조회 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "장바구니 조회에 실패했습니다.",
          error: err.message,
        });
      }
      return res.status(StatusCodes.OK).json({
        message: "장바구니 조회 성공!",
        data: results,
        count: results.length,
      });
    });
  } catch (error) {
    console.error("장바구니 조회 에러:", error);
    const { status, message, code } = handleAuthError(error);
    return res.status(status).json({ message, code });
  }
};

export const deleteCartItem = (req, res) => {
  const { cart_id } = req.params;

  const sql = "DELETE FROM cart WHERE cart_id = ?";
  const values = [cart_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("장바구니 삭제 DB 에러:", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
    return res.status(StatusCodes.OK).json({
      message: "장바구니 삭제 성공",
      results,
    });
  });
};

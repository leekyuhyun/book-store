import conn from "../db/mysql_connect.js";
import { StatusCodes } from "http-status-codes";

// 도서 전체 조회
export const getAllbooks = (req, res) => {
  const { category_id } = req.query;
  if (category_id) {
    const sql = `SELECT * FROM books WHERE category_id=?`;
    conn.query(sql, [caategory_id], (err, results) => {
      if (err) {
        console.error("카테고리별 조회 요청 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      }
      return res.status(StatusCodes.OK).json(results);
    });
  } else {
    const sql = `SELECT * FROM books`;

    conn.query(sql, (err, results) => {
      if (err) {
        console.error("도서 전체 조회 요청 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM books WHERE id = ?`;

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error("도서 개별 조회 요청 DB 에러:", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
    if (results[0]) {
      return res.status(StatusCodes.OK).json(results[0]);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "존재하지 않는 도서입니다.",
      });
    }
  });
};

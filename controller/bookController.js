import conn from "../db/mysql_connect.js";
import { Authorization, handleAuthError } from "../utils/auth.js";
import { StatusCodes } from "http-status-codes";

// 도서 전체 조회
export const getAllbooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;

  let auth = null;
  try {
    auth = Authorization(req);
  } catch (error) {
    auth = null;
  }

  let sql = `SELECT SQL_CALC_FOUND_ROWS *`;

  if (auth) {
    sql += `, (SELECT count(*) FROM likes WHERE liked_book_id = books.book_id) AS likes`;
  }

  sql += ` FROM books`;
  let values = [];

  if (category_id && news) {
    sql +=
      " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values.push(category_id);
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    values.push(category_id);
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }

  limit = limit || 10;
  currentPage = currentPage || 1;
  let parsedLimit = parseInt(limit);
  let parsedCurrentPage = parseInt(currentPage);
  let offset = (parsedCurrentPage - 1) * parsedLimit;

  sql += " LIMIT ? OFFSET ?";
  values.push(parsedLimit, offset);

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("도서 조회 DB 에러:", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }

    conn.query("SELECT FOUND_ROWS() AS total", (err, foundRows) => {
      if (err) {
        console.error("도서 총 개수 조회 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      }

      const totalCount = foundRows[0].total;
      const totalPages = Math.ceil(totalCount / parsedLimit);

      return res.status(StatusCodes.OK).json({
        data: results,
        pagination: {
          currentPage: parsedCurrentPage,
          limit: parsedLimit,
          totalCount,
          totalPages,
        },
      });
    });
  });
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT books.*, category.name AS category_name,
                  (SELECT count(*) FROM likes WHERE liked_book_id = books.book_id) AS likes 
               FROM books 
               LEFT JOIN category ON books.category_id = category.category_id 
               WHERE books.book_id = ?`;

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

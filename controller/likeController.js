import conn from "../db/mysql_connect.js";
import { StatusCodes } from "http-status-codes";
import { Authorization, handleAuthError } from "../utils/auth.js";

export const addLike = (req, res) => {
  try {
    const { liked_book_id } = req.params;

    const auth = Authorization(req);

    const sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
    const values = [auth.id, liked_book_id];

    conn.query(sql, values, function (err, results) {
      if (err) {
        console.error("좋아요 추가 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      }
      return res.status(StatusCodes.CREATED).json({
        message: "좋아요 성공!",
        result: results,
      });
    });
  } catch (error) {
    console.error("좋아요 추가 에러:", error);
    const { status, message, code } = handleAuthError(error);
    return res.status(status).json({ message, code });
  }
};

export const removeLike = (req, res) => {
  try {
    const { liked_book_id } = req.params;

    const auth = Authorization(req);

    const sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
    const values = [auth.id, liked_book_id];

    conn.query(sql, values, function (err, results) {
      if (err) {
        console.error("좋아요 삭제 DB 에러:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "좋아요 삭제에 실패했습니다.",
          error: err.message,
        });
      }
      return res.status(StatusCodes.CREATED).json({
        message: "좋아요 삭제 성공!",
        result: results,
      });
    });
  } catch (error) {
    console.error("좋아요 삭제 에러:", error);
    const { status, message, code } = handleAuthError(error);
    return res.status(status).json({ message, code });
  }
};

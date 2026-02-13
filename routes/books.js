import express from "express";
import { getAllbooks, getBookById } from "../controller/bookController.js";

const router = express.Router();

router
  .get("/", getAllbooks)

  .get("/:id", getBookById);

/* 
  .get("/", (req, res) => {
    req.query.category_id;
    res.json("카테고리별 도서 목록 조회");
  });
*/
export default router;

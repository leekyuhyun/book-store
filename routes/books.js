import express from "express";

const router = express.Router();

router
  .get("/", (req, res) => {
    res.json("전체 도서 조회");
  })

  .get("/:id", (req, res) => {
    res.json("개별 도서 조회");
  });

/* 
  .get("/", (req, res) => {
    req.query.category_id;
    res.json("카테고리별 도서 목록 조회");
  });
*/
export default router;

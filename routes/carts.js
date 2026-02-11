import express from "express";

const router = express.Router();

router
  .post("/", (req, res) => {
    res.json("장바구니 담기");
  })
  .get("/", (req, res) => {
    res.json("장바구니 조회");
  })

  .delete("/:id", (req, res) => {
    res.json("장바구니 도서 삭제");
  });
/*
  .get("/", (req, res) => {
    res.json("장바구니에서 선택한 주문 예상 상품 목록 조회");
  });
*/
export default router;

import express from "express";

const router = express.Router();

router
  .post("/:id", (req, res) => {
    res.json("좋아요 추가");
  })

  .delete("/:id", (req, res) => {
    res.json("좋아요 삭제");
  });

export default router;

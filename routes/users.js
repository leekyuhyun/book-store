import express from "express";

const router = express.Router();

router
  .post("/join", (req, res) => {
    res.json("회원가입");
  })

  .post("/login", (req, res) => {
    res.json("로그인");
  })

  .post("/reset", (req, res) => {
    res.json("비밀번호 초기화 요청");
  })

  .put("/reset", (req, res) => {
    res.json("비밀번호 초기화");
  });

export default router;

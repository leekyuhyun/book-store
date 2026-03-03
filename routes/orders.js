import express from "express";
import {
  order,
  getOrders,
  getOrderDetail,
} from "../controller/orderController.js";
const router = express.Router();

router
  .post("/", order)

  .get("/", getOrders)

  .get("/:id", getOrderDetail);

export default router;

import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
} from "../controllers/order.controller.js";
const router = express();

router.post("/order", createOrder);
router.get("/order", getAllOrders);
router.delete("/order/:id", deleteOrder);

export default router;

import express from "express";
import {
  getProduct,
  getSingleProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getProduct);

router.get("/product/:id", getSingleProduct);

export default router;

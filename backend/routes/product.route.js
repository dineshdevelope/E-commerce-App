import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getProduct);

router.get("/product/:id", getSingleProduct);

router.post("/addproduct", addProduct);

router.put("/product/:id", updateProduct);

router.delete("/product/:id", deleteProduct);

export default router;

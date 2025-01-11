import express from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import connectDB from "./lib/db.js";
import cors from "cors";
const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extented: true }));
app.use("/", productRoute);
app.use("/", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port: http://localhost:${process.env.PORT}`
  );
});

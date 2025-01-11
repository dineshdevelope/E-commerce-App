import { Schema, model } from "mongoose";

const schema = new Schema({
  cardItems: Array,
  amount: String,
  status: String,
  createdAt: Date,
});

const OrderModel = model("OrderModel", schema);

export default OrderModel;

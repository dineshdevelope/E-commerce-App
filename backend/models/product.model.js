import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  price: String,
  description: String,
  rattings: String,
  images: [
    {
      image: String,
    },
  ],
  category: String,
  seller: String,
  stock: String,
  numOfReviews: String,
  createdAt: String,
});

const ProductModel = model("Product", schema);

export default ProductModel;

import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  price: Number,
  description: String,
  ratings: Number,
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

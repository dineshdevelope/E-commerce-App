import ProductModel from "../models/product.model.js";
export const getProduct = async (req, res) => {
  try {
    // 1. Get the query parameters from the URL
    // 2. Check if the query parameter exists
    // 3. If it exists, use it to filter the products
    // 4. If it doesn't exist, return all the products
    // 5. Send the response back to the client

    //               To Search Functionality
    const query = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    const products = await ProductModel.find(query);

    // const products = await ProductModel.find(); // Fetch all the products from the database
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await ProductModel.findById(req.params.id);
    res.status(201).json(singleProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const newProduct = new ProductModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    ratings: req.body.ratings,
    category: req.body.category,
    seller: req.body.seller,
    stock: req.body.stock,
    images: req.body.images,
  });

  try {
    const product = await newProduct.save();
    res.status(201).json(product);
    console.log("Product added successfully!", product);
  } catch (error) {
    console.error("Error saving product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },

      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        ratings: req.body.ratings,
        images: req.body.images,
        category: req.body.category,
        seller: req.body.seller,
        stock: req.body.stock,
      },

      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

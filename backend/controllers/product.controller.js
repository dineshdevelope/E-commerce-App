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

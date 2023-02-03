import axios from "axios";

export const getAllProducts = async () => {
  const products = await axios.get("https://apartmanage.onrender.com/products");
  return products.data.products;
};

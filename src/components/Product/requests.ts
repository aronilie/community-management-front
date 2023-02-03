import axios from "axios";
import { Product } from "@components/Product/models";

export const markWasted = async (product: Product) => {
  await axios.put(`https://apartmanage.onrender.com/products/${product.id}`, {
    name: product.name,
    wasted: true,
  });
};

export const getReceiptsByProduct = async (product: Product) => {
  const receipts = await axios.get(
    `https://apartmanage.onrender.com/receipts/product/${product.id}`
  );
  return receipts.data.receipts;
};

export const deleteProduct = async (product: Product) => {
  await axios.delete(`https://apartmanage.onrender.com/products/${product.id}`);
};

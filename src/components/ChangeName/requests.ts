import axios from "axios";
import { Product } from "@components/Product/models";

export const changeProductName = async (product: Product, name: string) => {
  await axios.put(`https://apartmanage.onrender.com/products/${product.id}`, {
    name: name,
    wasted: product.wasted,
  });
};

export const changeUserPassword = async (userId: string, passwd: string) => {
  await axios.put(`https://apartmanage.onrender.com/users/${userId}`, {
    passwd: passwd,
  });
};

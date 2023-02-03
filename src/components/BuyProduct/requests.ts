import { Product } from "@components/Product/models";
import { User } from "@components/User/models";
import axios from "axios";

export const createReceipt = async (
  ownerId: string | null,
  productId: string | undefined,
  image: string | undefined,
  price: string
) => {
  const today = new Date();
  const content = {
    image: image,
    owner: ownerId,
    product: productId,
    price: price,
    date: today.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };

  await axios.post("https://apartmanage.onrender.com/receipts/create", content);
};

export const updateDebts = async (
  buyerId: string | null,
  amount: string | number
) => {
  await axios.put(
    `https://apartmanage.onrender.com/users/updateDebts/${buyerId}`,
    {
      amount: amount,
    }
  );
};

export const markAvailable = async (product: Product) => {
  await axios.put(`https://apartmanage.onrender.com/products/${product.id}`, {
    name: product.name,
    wasted: false,
  });
};

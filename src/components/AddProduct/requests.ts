import axios from "axios";

export const sendProduct = async (name: string) => {
  await axios.post("https://apartmanage.onrender.com/products/create", {
    name: name,
  });
};

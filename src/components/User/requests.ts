import axios from "axios";
import { User } from "./models";

export const getReceiptsByUser = async (user: User) => {
  const receipts = await axios.get(
    `https://apartmanage.onrender.com/receipts/user/${user.id}`
  );
  return receipts.data.receipts;
};

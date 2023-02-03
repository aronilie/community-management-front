import axios from "axios";

export const getAllReceipts = async () => {
  const receipts = await axios.get(`https://apartmanage.onrender.com/receipts`);
  return receipts.data.receipts;
};

export const getAllUsers = async () => {
  const receipts = await axios.get(`https://apartmanage.onrender.com/users`);
  return receipts.data.users;
};

import { client } from "./client";

export const getShoppingCarts = async () => {
  const { data } = await client.get("/shopping-carts");

  return data;
};

export const createShoppingCart = (data: any) => {
  return client.post("/shopping-carts", data);
};

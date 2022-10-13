import { Cart } from "../types";
import { client } from "./client";

export const getShoppingCarts = async () => {
  const { data } = await client.get("/shopping-carts");

  return data;
};

export const createShoppingCart = (data: any) => {
  return client.post("/shopping-carts", data);
};

interface UpdateShoppingCartArgs {
  cartId: string;
  data: Omit<Cart, "id" | "created_at" | "updated_at">;
}

export const updateShoppingCart = ({
  cartId,
  data,
}: UpdateShoppingCartArgs) => {
  return client.patch(`/shopping-carts/${cartId}`, data);
};

export const getShoppingCartById = async (id: string) => {
  const { data } = await client.get(`/shopping-carts/${id}`);

  return data;
};

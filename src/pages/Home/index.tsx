import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Modal } from "../../components";
import { RQQueryKeys } from "../../constants";
import { getShoppingCarts } from "../../api";
import { Main } from "../../layouts";
import { Cart } from "../../types";

import { AddCardButton, Card, CreateCartForm } from "./components";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery<Cart[]>(
    [RQQueryKeys.carts],
    getShoppingCarts
  );

  const onClose = () => setIsOpen(false);

  return (
    <Main>
      <h1 className="text-center py-10 px-2 text-xl font-medium">
        Mis carritos de compra
      </h1>
      <section className="flex gap-4">
        {data?.map((cart) => (
          <Card id={cart.id} description="" />
        ))}
        <AddCardButton onClick={() => setIsOpen(true)} />
      </section>
      <Modal isOpen={isOpen} onClose={onClose}>
        <CreateCartForm onSuccess={onClose} />
      </Modal>
    </Main>
  );
};

export default Home;

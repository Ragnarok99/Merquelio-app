import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Modal, CreateCartForm } from "../../components";
import { RQQueryKeys } from "../../constants";
import { getShoppingCarts } from "../../api";
import { Main } from "../../layouts";
import { Cart } from "../../types";

import { AddCardButton, Card } from "./components";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery<Cart[]>(
    [RQQueryKeys.carts],
    getShoppingCarts
  );

  const onClose = () => setIsOpen(false);

  return (
    <Main>
      <h1 className="text-center py-10 px-2 text-xl font-medium text-gray-700 dark:text-gray-200">
        Mis carritos de compra
      </h1>
      <section className="flex flex-col sm:flex-row gap-4 px-2">
        {data?.map((cart) => (
          <Card id={cart.id} key={cart.id} description="" name={cart.name} />
        ))}
        <AddCardButton onClick={() => setIsOpen(true)} />
      </section>
      <Modal
        title="Crea un carrito de compras"
        isOpen={isOpen}
        onClose={onClose}
      >
        <CreateCartForm onSuccess={onClose} />
      </Modal>
    </Main>
  );
};

export default Home;

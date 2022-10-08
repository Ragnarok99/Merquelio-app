import { useState } from "react";
import { Modal } from "../../components";

import { Main } from "../../layouts";
import { AddCardButton, Card, CreateCartForm } from "./components";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Main>
      <h1 className="text-center py-10 px-2 text-xl font-medium">
        Mis carritos de compra
      </h1>
      <section className="flex gap-4">
        <Card />
        <AddCardButton onClick={() => setIsOpen(true)} />
      </section>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateCartForm />
      </Modal>
    </Main>
  );
};

export default Home;

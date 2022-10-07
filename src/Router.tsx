import { Routes, Route } from "react-router-dom";

import { Home, CartDetails } from "./pages";

const Router = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart/:id" element={<CartDetails />} />
      </Routes>
    </div>
  );
};

export default Router;

import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import CartModal from "./CartModal";
import { CartIcon } from "./Icons";

export default function CartSummary() {
  const { cartCount, formattedTotalPrice } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <nav onClick={toggleModal} className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <span className="mr-5 hover:text-white flex items-center">
          <CartIcon />
          <span className="ml-3">{formattedTotalPrice} ({cartCount})</span>
        </span>
      </nav>
      <CartModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
}

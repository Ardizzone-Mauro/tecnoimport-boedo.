import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getTotalItems, getCartTotal, checkout } = useCart();
  const total = getCartTotal();

  return (
    <>
      <p>Artículos en el carrito: {getTotalItems()}</p>
      <p>Total a pagar: ${total}</p>
      <></>
      <button className="btn bg-success primary" onClick={checkout}>
        Finalizar compra
      </button>
    </>
  );
};

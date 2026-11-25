import { useCart } from "../../context/CartContext";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { Link } from "react-router-dom";
import "./Cart.css";

export const CartView = () => {
  const { cart } = useCart();

  return (
    <section className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length ? (
        <>
          <CartList />
          <CartSummary />
        </>
      ) : (
        <>
          <p className="empty-cart">El carrito está vacío</p>
          <Link className="btn primary bg-primary" to="/">
            Volver al inicio
          </Link>
        </>
      )}
    </section>
  );
};

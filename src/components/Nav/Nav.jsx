import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Nav.css";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li className="categories-menu">
          <button
            type="button"
            className="categories-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Categorías ▾
          </button>

          {menuOpen && (
            <ul className="categories-dropdown">
              <li>
                <Link
                  to="/category/celulares"
                  onClick={() => setMenuOpen(false)}
                >
                  Celulares
                </Link>
              </li>

              <li>
                <Link to="/category/laptops" onClick={() => setMenuOpen(false)}>
                  Laptops
                </Link>
              </li>

              <li>
                <Link to="/category/audio" onClick={() => setMenuOpen(false)}>
                  Audio
                </Link>
              </li>

              <li>
                <Link
                  to="/category/smartwatches"
                  onClick={() => setMenuOpen(false)}
                >
                  Smartwatches
                </Link>
              </li>

              <li>
                <Link
                  to="/category/monitores"
                  onClick={() => setMenuOpen(false)}
                >
                  Monitores
                </Link>
              </li>

              <li>
                <Link
                  to="/category/accesorios"
                  onClick={() => setMenuOpen(false)}
                >
                  Accesorios
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to={"/cart"}>
            Carrito
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

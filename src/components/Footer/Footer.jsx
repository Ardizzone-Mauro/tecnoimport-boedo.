import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <p>© 2026 Mi Tienda. Todos los derechos reservados.</p>

      <nav aria-label="Redes sociales">
        <ul className="nav-list">
          <li aria-label="WhatsApp">
            <FaWhatsapp />
          </li>

          <li aria-label="Instagram">
            <FaInstagram />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

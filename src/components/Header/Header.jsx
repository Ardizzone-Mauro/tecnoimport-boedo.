import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/tecnoimport-boedo-logo.svg";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo tecnoimport boedo" />
          <span>TecnoImport Boedo</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};

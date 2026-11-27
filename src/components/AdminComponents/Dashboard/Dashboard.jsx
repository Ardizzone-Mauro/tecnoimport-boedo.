import { Link } from "react-router-dom";
import "./Dashboard.css";

import { useAuth } from "../../../context/AuthContext";

import { ProductsListContainer } from "../ProductsListContainer/ProductsListContainer";

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      {/* ENCABEZADO */}
      <header className="dashboard-header">
        <div>
          <h2>Panel de administración</h2>
          <p>Gestioná los productos de TecnoImport Boedo</p>
        </div>

        <div className="header-actions">
          <Link className="btn btn-secondary" to="/">
            Volver a la tienda
          </Link>

          <button className="btn bg-delete primary" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ACCIONES RÁPIDAS */}
      <section className="dashboard-actions">
        <div className="dashboard-section-header">
          <h3>Gestión de productos</h3>

          <Link to="/admin/products/new" className="dashboard-add-btn">
            + Agregar producto
          </Link>
        </div>
      </section>

      {/* LISTADO DE PRODUCTOS */}
      <section className="dashboard-products">
        <ProductsListContainer showHeader={false} />
      </section>
    </div>
  );
};

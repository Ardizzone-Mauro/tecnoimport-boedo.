import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "../../../services/productsService";

import "./ProductsListContainer.css";

export const ProductsListContainer = ({ showHeader = true }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de eliminar este producto?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="admin-products-message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="admin-products-message">Error: {error}</p>;
  }

  return (
    <section className="admin-products">
      {showHeader && (
        <div className="admin-products-header">
          <h1>Administración de productos</h1>

          <Link to="/admin/products/new" className="admin-add-btn">
            + Agregar producto
          </Link>
        </div>
      )}

      {products.length === 0 ? (
        <p className="admin-products-message">No hay productos registrados.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Precio</th>
                <th className="stock-heading">Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="admin-product-image">
                    {product.pictureUrl || product.image ? (
                      <img
                        src={product.pictureUrl}
                        alt={product.name ?? product.title ?? "Producto"}
                        className="admin-product-thumbnail"
                        loading="lazy"
                      />
                    ) : (
                      <div className="admin-no-image">Sin imagen</div>
                    )}
                  </td>

                  <td className="admin-product-name">
                    {product.name ?? product.title}
                  </td>

                  <td className="admin-product-price">
                    ${Number(product.price).toLocaleString("es-AR")}
                  </td>

                  <td className="admin-product-stock">{product.stock}</td>

                  <td className="admin-product-category">{product.category}</td>

                  <td>
                    <div className="admin-row-actions">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="admin-edit-btn"
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        className="admin-delete-btn"
                        disabled={deletingId !== null}
                        onClick={() => handleDelete(product.id)}
                      >
                        {deletingId === product.id
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
  const { id } = useParams();

  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItemDetail(null);
    setLoading(true);
    setError(null);

    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar el producto.");
        }

        return res.json();
      })
      .then((data) => {
        const item = data.find((product) => product.id === id);

        if (!item) {
          throw new Error("Producto no encontrado.");
        }

        setItemDetail(item);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalle del producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!itemDetail) return <p>Producto no encontrado.</p>;

  return (
    <section>
      <h1>Detalle del producto</h1>

      <div className="products-container">
        <ItemDetail item={itemDetail} />
      </div>
    </section>
  );
};

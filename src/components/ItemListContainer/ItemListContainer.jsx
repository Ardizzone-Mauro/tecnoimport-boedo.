import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Capturamos la categoría desde la URL: /category/:categoryId
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los productos");
        }

        return res.json();
      })
      .then((data) => {
        //si existe una categoria, filtramos.
        if (categoryId) {
          const filtered = data.filter(
            (prod) => prod.category.toLowerCase() === categoryId.toLowerCase(),
          );

          setProducts(filtered);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => {
        setError(error.message);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h1>{categoryId ? `Categoría: ${categoryId}` : "Todos los productos"}</h1>

      {products.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
};

// import { useEffect, useState } from "react";
// import { ItemList } from "../ItemList/ItemList";
// import { getProducts, getByCategory } from "../../services/productService";

// export const ItemListContainer = () => {
// const {categoryId} = useParams();

//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // // Capturamos la categoría desde la URL: /category/:categoryId
//   // const { categoryId } = useParams();

//   // useEffect(() => {
//   //   getByCategory(category);

//   //   setLoading(true);
//   //   setError(null);

//   //   fetch("/data/products.json")
//   //     .then((res) => {
//   //       if (!res.ok) {
//   //         throw new Error("Error al obtener los productos");
//   //       }

//   //       return res.json();
//   //     })
//   //     .then((data) => {
//   //       //si existe una categoria, filtramos.
//   //       if (categoryId) {
//   //         const filtered = data.filter(
//   //           (prod) => prod.category.toLowerCase() === categoryId.toLowerCase(),
//   //         );

//   //         setProducts(filtered);
//   //       } else {
//   //         setProducts(data);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       setError(error.message);
//   //       setProducts([]);
//   //     })
//   //     .finally(() => {
//   //       setLoading(false);
//   //     });
//   // }, [categoryId]);

//   useEffect(() => {
//     //Usamos la funcion del productsService.js
//     getProducts()
//       .then((data) => setProducts(data))
//       .catch((error) => setError(error.message))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p>Cargando productos...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // return (
//   //   <section>
//   //     <h1>{category ? `Categoría: ${category}` : "Todos los productos"}</h1>

//   //     {products.length === 0 ? (
//   //       <p>No hay productos en esta categoría.</p>
//   //     ) : (
//   //       <ItemList products={products} />
//   //     )}
//   //   </section>
//   // );

//   return (
//     <section>
//       <h1>Productos</h1>
//       <ItemList products={products} />
//     </section>
//   );
// };

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";

import { getProducts, getByCategory } from "../../services/productsService";

export const ItemListContainer = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    // Si hay categoría, filtramos.
    // Si no hay categoría, traemos todos.
    const request = categoryId ? getByCategory(categoryId) : getProducts();

    request
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((error) => {
        if (active) {
          setError(error.message);
          setProducts([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
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

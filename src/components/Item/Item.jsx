import "./Item.css";

export const Item = ({ title, price, description, pictureUrl, children }) => {
  return (
    <article className="card">
      <img src={pictureUrl} alt={title} />

      <h3>{title}</h3>

      <p>{description}</p>

      <p>Precio: ${price.toLocaleString("es-AR")}</p>

      {children}
    </article>
  );
};

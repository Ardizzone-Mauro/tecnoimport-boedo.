export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
  isEditing = false,
  currentImage = "",
  previewImage = "",
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{isEditing ? "Editar producto" : "Agregar nuevo producto"}</h2>

        {/* NOMBRE */}
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* PRECIO */}
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min="0"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        {/* STOCK */}
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={onChange}
            min="0"
            step="1"
          />
          {errors.stock && <p className="error">{errors.stock}</p>}
        </div>

        {/* CATEGORIA */}
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {/* DESCRIPCION */}
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* IMAGEN */}
        <div className="form-image-section">
          <label>
            {isEditing ? "Cambiar imagen:" : "Imagen del producto:"}
          </label>

          {/* Imagen seleccionada o imagen existente */}
          {(previewImage || currentImage) && (
            <div className="image-preview">
              <p>
                {previewImage
                  ? "Vista previa de la imagen seleccionada:"
                  : "Imagen actual:"}
              </p>

              <img
                src={previewImage || currentImage}
                alt={`Vista previa de ${product.name}`}
                className="preview-img"
              />
            </div>
          )}

          <input type="file" accept="image/*" onChange={onFileChange} />

          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        {/* BOTON GUARDAR */}
        <button className="btn bg-primary" type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : isEditing
              ? "Guardar cambios"
              : "Agregar producto"}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};

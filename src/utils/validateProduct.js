export const validateProduct = (product) => {
  const errors = {};

  // Validar nombre
  if (!product.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  // Validar precio
  if (
    product.price === "" ||
    product.price == null ||
    !Number.isFinite(Number(product.price)) ||
    Number(product.price) <= 0
  ) {
    errors.price = "El precio debe ser mayor que 0";
  }

  // Validar stock
  if (
    product.stock === "" ||
    product.stock == null ||
    !Number.isInteger(Number(product.stock)) ||
    Number(product.stock) < 0
  ) {
    errors.stock = "El stock debe ser un número entero mayor o igual a 0";
  }

  // Validar descripción
  if (!product.description?.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  // Validar categoría
  if (!product.category?.trim()) {
    errors.category = "La categoría es obligatoria";
  }

  // Validar imagen
  // Al editar, podemos conservar la imagen existente.
  if (!product.isEditing && !product.file && !product.currentImage) {
    errors.file = "La imagen es obligatoria";
  }

  return errors;
};

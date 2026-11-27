import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";

import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../../services/productsService";

import "./ProductFormContainer.css";

const initialProduct = {
  name: "",
  stock: "",
  price: "",
  category: "",
  description: "",
};

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(initialProduct);
  const [currentImage, setCurrentImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // CARGAR PRODUCTO SI ESTAMOS EDITANDO
  useEffect(() => {
    let active = true;

    setErrors({});
    setFile(null);

    if (!id) {
      setProduct(initialProduct);
      setCurrentImage("");
      setLoadingProduct(false);
      return;
    }

    setLoadingProduct(true);

    getProductById(id)
      .then((data) => {
        if (!active) return;

        if (!data) {
          setErrors({
            general: "El producto no existe",
          });
          return;
        }

        setProduct({
          name: data.name ?? data.title ?? "",
          stock: data.stock ?? "",
          price: data.price ?? "",
          category: data.category ?? "",
          description: data.description ?? data.descripcion ?? "",
        });

        setCurrentImage(data.image ?? data.pictureUrl ?? "");
      })
      .catch((error) => {
        if (active) {
          setErrors({ general: error.message });
        }
      })
      .finally(() => {
        if (active) setLoadingProduct(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!file) {
      setPreviewImage("");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    // En edición permitimos conservar la imagen actual.
    // validateProduct debe contemplar ese caso.
    const newErrors = validateProduct({
      ...product,
      file,
      currentImage,
      isEditing,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      let imageUrl = currentImage;

      // Subir imagen solo cuando el usuario elige otra.
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const productData = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        pictureUrl: imageUrl,
      };

      if (isEditing) {
        await updateProduct(id, productData);

        navigate("/admin/products", {
          replace: true,
        });
      } else {
        const newId = await createProduct(productData);

        setProduct(initialProduct);
        setFile(null);

        navigate(`/admin/products/success/${newId}`, {
          replace: true,
        });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return <p>Cargando datos del producto...</p>;
  }

  return (
    <section>
      <h1>{isEditing ? "Editar producto" : "Agregar producto"}</h1>

      {errors.general && <p role="alert">{errors.general}</p>}

      <ProductFormUI
        product={product}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        currentImage={currentImage}
        previewImage={previewImage}
      />
    </section>
  );
};

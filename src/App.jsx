import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";

import { ProductFormContainer } from "./components/AdminComponents/productForm/ProductFormContainer";
import { ProductSuccess } from "./components/AdminComponents/ProductSuccess";
import { Dashboard } from "./components/AdminComponents/Dashboard/Dashboard";
import { ProductsListContainer } from "./components/AdminComponents/ProductsListContainer/ProductsListContainer";

import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<ItemListContainer />} />

        <Route path="/category/:categoryId" element={<ItemListContainer />} />

        <Route path="/product/:id" element={<ItemDetailContainer />} />

        <Route path="/cart" element={<CartView />} />
      </Route>

      {/* LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* RUTAS ADMINISTRADOR */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<ProductsListContainer />} />

        <Route path="products/new" element={<ProductFormContainer />} />

        <Route path="products/edit/:id" element={<ProductFormContainer />} />

        <Route path="products/success/:id" element={<ProductSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;

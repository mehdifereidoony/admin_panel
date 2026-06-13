import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import Products from "./pages/Products/Products";
import NotificationProvider from "./context/notificationContext";
import LoginRoute from "./components/common/LoginRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Router  */}
          <Route element={<LoginRoute />}>
            <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          </Route>
          {/* Admin Router  */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<ProductCategory />} />
            <Route path="/products" element={<Products />} />
          </Route>
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;

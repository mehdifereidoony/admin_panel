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
import ChildCategories from "./pages/ProductCategory/components/ChildCategories";
import Attributes from "./pages/ProductCategory/attributes/Attributes";
import Brands from "./pages/Brands/Brands";
import Warranties from "./pages/Warranties/Warranties";
import Colors from "./pages/Colors/Colors";
import AddProduct from "./pages/Products/components/AddProduct";
import Discounts from "./pages/Discounts/Discounts";
import AddDiscount from "./pages/Discounts/components/AddDiscount";
import Permissions from "./pages/Permissions/Permissions";
import Roles from "./pages/Roles/Roles";
import AddRole from "./pages/Roles/components/AddRole";
import Users from "./pages/Users/Users";
import AddUser from "./pages/Users/components/AddUser";


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
              <Route path="/categories" element={<ProductCategory />}>
                <Route path=":parentId" element={<ChildCategories />} />
              </Route>
              <Route
                path="/categories/:categoryId/attributes"
                element={<Attributes />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add-product" element={<AddProduct />} />
              <Route path="/products/edit-product" element={<AddProduct />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/warranties" element={<Warranties />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/discounts" element={<Discounts />}>
                <Route path="add-discount" element={<AddDiscount />} />
              </Route>
              <Route path="/user" element={<Users />}>
                <Route path="add-user" element={<AddUser />} />
              </Route>
              <Route path="/roles" element={<Roles />}>
                <Route path="add-role" element={<AddRole />} />
              </Route>
              <Route path="/permissions" element={<Permissions />} />
            </Route>
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;

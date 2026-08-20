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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/slices/userSlice";
import { usePermission } from "./hooks/usePermission";

const App = () => {
  const dispatch = useDispatch();
  const { can } = usePermission();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
              {can("read_categories") && (
                <Route path="/categories" element={<ProductCategory />}>
                  <Route path=":parentId" element={<ChildCategories />} />
                </Route>
              )}

              {can("read_category_attrs") && (
                <Route
                  path="/categories/:categoryId/attributes"
                  element={<Attributes />}
                />
              )}

              {can("read_products") && (
                <Route path="/products" element={<Products />} />
              )}

              {can("create_product") && (
                <Route path="/products/add-product" element={<AddProduct />} />
              )}

              {can("read_brands") && (
                <Route path="/brands" element={<Brands />} />
              )}

              {can("read_guarantees") && (
                <Route path="/warranties" element={<Warranties />} />
              )}

              {can("read_colors") && (
                <Route path="/colors" element={<Colors />} />
              )}

              {can("read_discounts") && (
                <Route path="/discounts" element={<Discounts />}>
                  {can("create_discount") && (
                    <Route path="add-discount" element={<AddDiscount />} />
                  )}
                </Route>
              )}

              {can("read_users") && (
                <Route path="/user">
                  <Route index element={<Users />} />

                  {can("create_user") && (
                    <Route path="add-user" element={<AddUser />} />
                  )}
                </Route>
              )}

              {can("read_roles") && (
                <Route path="/roles">
                  <Route index element={<Roles />} />

                  {can("create_role") && (
                    <Route path="add-role" element={<AddRole />} />
                  )}
                </Route>
              )}

              {can("read_permissions") && (
                <Route path="/permissions" element={<Permissions />} />
              )}
            </Route>
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;

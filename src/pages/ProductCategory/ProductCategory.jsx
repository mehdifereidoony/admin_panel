import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import AddCategory from "./components/AddCategory";
import { getCategories } from "../../services/categoryService";
import { useNotification } from "../../context/notificationContext";
import ShowInMenu from "./components/ShowInMenu";
import Actions from "./components/Actions";
import IsActive from "./components/IsActive";
import { Outlet, useLocation, useParams } from "react-router";
import { formatDate } from "../../utils/formatDate";
import Spinner from "../../components/ui/Spinner";

const itemsInTable = [
  { field: "id", title: "#" },
  { field: "title", title: "نام" },
  { field: "parent_id", title: "دسته مادر" },
];

const additionalColumn = [
  { title: "تاریخ", value: (data) => formatDate(data.created_at) },
  { title: "نمایش در منو", value: (data) => <ShowInMenu data={data} /> },
  { title: "فعال", value: (data) => <IsActive data={data} /> },
  { title: "عملیات", value: (data) => <Actions data={data} /> },
];

const ProductCategory = () => {
  const addNotification = useNotification();
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getCategoriesData = async () => {
      setIsLoading(true);
      try {
        const res = await getCategories(params.parentId);
        if (res.status == 200) {
          setData(res.data.data);
          return;
        }
        addNotification("error", res.message);
      } catch {
        addNotification("error", "مشکلی از سمت سرور رخ داد");
      } finally {
        setIsLoading(false);
      }
    };
    getCategoriesData();
  }, [params, location, refresh]);
  return (
    <div
      id="manage_product_category"
      className="manage_product_category main_section "
    >
      <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>
      <Outlet />
      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={12}
        searchField={["title", "category"]}
        isLoading={isLoading}
      >
        <AddCategory setRefresh={setRefresh} />
      </DataTable>
    </div>
  );
};

export default ProductCategory;

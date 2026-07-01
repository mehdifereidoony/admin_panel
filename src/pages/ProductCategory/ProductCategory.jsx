import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../../components/common/DataTable";
import AddCategory from "./components/AddCategory";
import {
  deleteCategoryService,
  getCategoriesService,
} from "../../services/categoryService";
import { useNotification } from "../../context/notificationContext";
import ShowInMenu from "./components/ShowInMenu";
import Actions from "./components/Actions";
import IsActive from "./components/IsActive";
import { Outlet, useLocation, useParams } from "react-router";
import { formatDate } from "../../utils/formatDate";
import CategoriesProvider from "../../context/categoriesContext";

const itemsInTable = [
  { field: "id", title: "#" },
  { field: "title", title: "نام" },
  { field: "parent_id", title: "دسته مادر" },
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
        const res = await getCategoriesService(params.parentId);
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
  const deleteCategory = useCallback(async (item) => {
    if (confirm(`آیا از حذف ${item.title} مطمعن هیتید؟`)) {
      try {
        const res = await deleteCategoryService(item.id);
        if (res.status == 200) {
          addNotification("success", "دسته با موفقیت حذف شد");
          setData((prev) =>
            prev.filter((d) => {
              console.log(d.id, item.id);
              return d.id !== item.id;
            })
          );
        } else {
          addNotification("error", "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      }
    }
  }, []);
  const additionalColumn = useMemo(() => [
    { title: "تاریخ", value: (data) => formatDate(data.created_at) },
    { title: "نمایش در منو", value: (data) => <ShowInMenu data={data} /> },
    { title: "فعال", value: (data) => <IsActive data={data} /> },
    {
      title: "عملیات",
      value: (data) => <Actions data={data} deleteCategory={deleteCategory} />,
    },
  ]);
  return (
    <CategoriesProvider>
      <div
        id="manage_product_category"
        className="manage_product_category main_section "
      >
        <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>
        <Outlet />
        <AddCategory setRefresh={setRefresh} />
        <DataTable
          data={data}
          itemsInTable={itemsInTable}
          additionalColumn={additionalColumn}
          itemsInPage={12}
          searchField={["title", "category"]}
          isLoading={isLoading}
        ></DataTable>
      </div>
    </CategoriesProvider>
  );
};

export default ProductCategory;

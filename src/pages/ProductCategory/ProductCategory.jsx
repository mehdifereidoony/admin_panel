import DataTable from "../../components/common/DataTable";
import AddCategory from "./components/AddCategory";

const data = [
  {
    id: 1,
    title: "aaa",
    category: "bbb",
    status: "test",
  },
  {
    id: 2,
    title: "bbb",
    category: "bbb",
    status: "test",
  },
  {
    id: 3,
    title: "ccc",
    category: "bbb",
    status: "test",
  },
  {
    id: 4,
    title: "ddd",
    category: "bbb",
    status: "test",
  },
];
const itemsInTable = [
  { field: "id", title: "#" },
  { field: "category", title: "دسته" },
  { field: "title", title: "نام" },
  { field: "status", title: "وضعیت" },
];

const actionsTable = (id) => (
  <>
    <i
      id={id}
      className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
      title="زیرمجموعه"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
    ></i>
    <i
      id={id}
      className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
      title="ویرایش دسته"
      data-bs-toggle="modal"
      data-bs-placement="top"
      data-bs-target="#add_product_category_modal"
    ></i>
    <i
      id={id}
      className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
      title="افزودن ویژگی"
      data-bs-toggle="modal"
      data-bs-target="#add_product_category_attr_modal"
    ></i>
    <i
      id={id}
      className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
      title="حذف دسته"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
    ></i>
  </>
);

const additionalColumn = { title: "عملیات", value: (id) => actionsTable(id) };

const ProductCategory = () => {
  return (
    <div
      id="manage_product_category"
      className="manage_product_category main_section "
    >
      <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>
      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={3}
        searchField={["title", "category"]}
      >
        <AddCategory />
      </DataTable>
    </div>
  );
};

export default ProductCategory;

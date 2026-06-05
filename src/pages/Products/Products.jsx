import DataTable from "../../components/common/DataTable";
import AddProduct from "./components/AddProduct";

const data = [
  {
    id: 1,
    title: "aaa",
    category: "bbb",
    status: "test",
    price: 150_000,
  },
  {
    id: 2,
    title: "bbb",
    category: "bbb",
    status: "test",
    price: 150_000,
  },
  {
    id: 3,
    title: "ccc",
    category: "bbb",
    status: "test",
    price: 150_000,
  },
  {
    id: 4,
    title: "ddd",
    category: "bbb",
    status: "test",
    price: 150_000,
  },
  {
    id: 5,
    title: "ddd",
    category: "bbb",
    status: "test",
    price: 160_000,
  },
  {
    id: 6,
    title: "ddd",
    category: "bbb",
    status: "test",
    price: 170_000,
  },
];
const itemsInTable = [
  { field: "id", title: "#" },
  { field: "category", title: "دسته" },
  { field: "title", title: "نام" },
  { field: "status", title: "وضعیت" },
  { field: "price", title: "قیمت" },
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

const Products = () => {
  return (
    <div
      id="manage_product_section"
      className="manage_product_section main_section"
    >
      <h4 className="text-center my-3">مدیریت محصولات</h4>
      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={5}
        searchField={["title"]}
      >
        <AddProduct />
      </DataTable>
    </div>
  );
};

export default Products;

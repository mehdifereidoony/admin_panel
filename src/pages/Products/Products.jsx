import { useEffect, useRef, useState } from "react";
import {
  deleteProductService,
  getProductsService,
} from "../../services/productService";
import { useNotification } from "../../context/notificationContext";
import ActionsProducts from "./components/ActionsProduct";
import ProductDataTable from "./components/ProductDataTable";
import ShowProductCategories from "./components/ShowProductCategories";
import ProductImage from "./components/ProductImage";
import { Link } from "react-router";

const itemsInTable = [
  { field: "id", title: "#" },
  { field: "title", title: "نام" },
  { field: "price", title: "قیمت" },
  { field: "short_descriptions", title: "توضیحات کوتاه" },
];

const count = 4;
let pageCount = 1;

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const addNotification = useNotification();

  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMainSearch(searchField);
    }, 1000);
  }, [searchField]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await getProductsService(currentPage, count, mainSearch);
        if (res.status == 200) {
          setData(res.data.data);
          pageCount = res.data.last_page;
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [currentPage, mainSearch]);

  const deleteProduct = async (rowData) => {
    if (confirm(`آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
      try {
        const res = await deleteProductService(rowData.id);
        if (res.status == 200) {
          addNotification("success", `${rowData.title} با موفقیت حذف شد`);
          setData((oldData) => oldData.filter((d) => d.id !== rowData.id));
        }
      } catch {
        addNotification("error", "مشکلی پیش آمده");
      }
    }
  };

  const additionalColumn = [
    {
      title: "دسته ها",
      value: (data) => <ShowProductCategories data={data} />,
    },
    { title: "تصویر", value: (data) => <ProductImage data={data} /> },
    {
      title: "عملیات",
      value: (data) => (
        <ActionsProducts data={data} deleteProduct={deleteProduct} />
      ),
    },
  ];

  return (
    <div
      id="manage_product_section"
      className="manage_product_section main_section"
    >
      <h4 className="text-center my-3">مدیریت محصولات</h4>
      <ProductDataTable
        data={data}
        isLoading={isLoading}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSearchField={setSearchField}
        searchField={searchField}
        breadCount={2}
      >
        <Link
          to="add-product"
          className="btn btn-success d-flex justify-content-center align-items-center"
        >
          <i className="fas fa-plus text-light"></i>
        </Link>
      </ProductDataTable>
    </div>
  );
};

export default Products;

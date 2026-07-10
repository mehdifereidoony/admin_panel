import { useEffect, useRef, useState } from "react";
import AddProduct from "./components/AddProduct";
import { getProductsService } from "../../services/productService";
import { useNotification } from "../../context/notificationContext";
import ActionsProducts from "./components/ActionsProduct";
import ProductDataTable from "./components/ProductDataTable";
import ShowProductCategories from "./components/ShowProductCategories";
import ProductImage from "./components/ProductImage";

const itemsInTable = [
  { field: "id", title: "#" },
  { field: "title", title: "نام" },
  { field: "price", title: "قیمت" },
  { field: "short_descriptions", title: "توضیحات کوتاه" },
];
const additionalColumn = [
  { title: "دسته ها", value: (data) => <ShowProductCategories data={data} /> },
  { title: "تصویر", value: (data) => <ProductImage data={data} /> },
  { title: "عملیات", value: (data) => <ActionsProducts data={data} /> },
];
const count = 1;
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
        <AddProduct />
      </ProductDataTable>
    </div>
  );
};

export default Products;

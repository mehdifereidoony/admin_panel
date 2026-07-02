import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import ActionsBrands from "./components/ActionsBrand";
import { useNotification } from "../../context/notificationContext";
import { getBrandsService } from "../../services/brandService";
import AddBrand from "./components/AddBrand";

const Brands = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addNotification = useNotification();
  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "persian_name", title: "نام برند" },
    { field: "descriptions", title: "توضیحات " },
  ];
  const additionalColumn = [
    {
      title: "لوگو",
      value: (data) =>
        data.logo ? (
          <img
            src={import.meta.env.VITE_BASE_URL + data.logo}
            style={{ maxWidth: "100px" }}
          />
        ) : (
          <p>بدون لوگو</p>
        ),
    },
    { title: "عملیات", value: (data) => <ActionsBrands data={data} /> },
  ];
  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await getBrandsService();
        if (res.status == 200) {
          setData(res.data.data);
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      } finally {
        setIsLoading(false);
      }
    };
    getBrands();
  }, []);
  return (
    <div
      id="manage_brand_section"
      className="manage_brand_section main_section"
    >
      <h4 className="text-center my-3">مدیریت برند ها</h4>
      <AddBrand setData={setData} />
      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={12}
        searchField={["persian_name", "descriptions"]}
        isLoading={isLoading}
      ></DataTable>
    </div>
  );
};

export default Brands;

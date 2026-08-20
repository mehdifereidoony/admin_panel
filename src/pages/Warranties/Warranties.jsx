import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import ActionsWarranty from "./components/ActionsWarranty";
import { useNotification } from "../../context/notificationContext";
import {
  deleteWarrantiesService,
  getWarrantiesService,
} from "../../services/warrantyService";
import AddWarranties from "./components/AddWarranties";
import WarrantiesProvider from "../../context/warrantiesContext";

const lengthUnitLabels = {
  year: "سال",
  month: "ماه",
  day: "روز",
};

const Warranties = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addNotification = useNotification();
  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "descriptions", title: "توضیحات" },
    { field: "length", title: "مقدار اعتبار" },
  ];
  const deleteWarranties = async (rowData) => {
    if (confirm(`آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
      try {
        const res = await deleteWarrantiesService(rowData.id);
        if (res.status == 200) {
          addNotification("success", "گارانتی با موفقیت حذف شد");
          setData((oldData) => [...oldData].filter((d) => d.id !== rowData.id));
        } else {
          console.log(res);
          addNotification("error", "مشکلی پیش آمده");
        }
      } catch {
        addNotification("error", "مشکلی پیش آمده");
      }
    }
  };
  const additionalColumn = [
    {
      title: "واحد اعتبار",
      value: (row) => lengthUnitLabels[row.length_unit] || row.length_unit,
    },
    {
      title: "عملیات",
      value: (row) => (
        <ActionsWarranty data={row} deleteWarranties={deleteWarranties} />
      ),
    },
  ];
  useEffect(() => {
    const getWarranties = async () => {
      try {
        const res = await getWarrantiesService();
        if (res.status == 200) {
          setData(res.data.data);
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      } finally {
        setIsLoading(false);
      }
    };
    getWarranties();
  }, []);
  return (
    <WarrantiesProvider>
      <div
        id="manage_warranty_section"
        className="manage_warranty_section main_section"
      >
        <h4 className="text-center my-3">مدیریت گارانتی‌ها</h4>
        <AddWarranties setData={setData} />
        <DataTable
          data={data}
          itemsInTable={itemsInTable}
          additionalColumn={additionalColumn}
          itemsInPage={12}
          searchField={["title", "descriptions"]}
          isLoading={isLoading}
        ></DataTable>
      </div>
    </WarrantiesProvider>
  );
};

export default Warranties;

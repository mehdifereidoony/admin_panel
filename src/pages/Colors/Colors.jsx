import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import ActionsColor from "./components/ActionsColor";
import { useNotification } from "../../context/notificationContext";
import {
  deleteColorsService,
  getColorsService,
} from "../../services/colorService";
import AddColor from "./components/AddColor";
import ColorsProvider from "../../context/colorsContext";

const Colors = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addNotification = useNotification();
  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "code", title: "کد رنگ" },
  ];
  const deleteColors = async (rowData) => {
    if (confirm(`آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
      try {
        const res = await deleteColorsService(rowData.id);
        if (res.status == 200) {
          addNotification("success", "رنگ با موفقیت حذف شد");
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
      title: "نمونه",
      value: (row) => (
        <span
          style={{
            display: "inline-block",
            width: "32px",
            height: "32px",
            backgroundColor: row.code,
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          title={row.code}
        />
      ),
    },
    {
      title: "عملیات",
      value: (row) => (
        <ActionsColor data={row} deleteColors={deleteColors} />
      ),
    },
  ];
  useEffect(() => {
    const getColors = async () => {
      try {
        const res = await getColorsService();
        if (res.status == 200) {
          setData(res.data.data);
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      } finally {
        setIsLoading(false);
      }
    };
    getColors();
  }, []);
  return (
    <ColorsProvider>
      <div id="manage_color_section" className="manage_color_section main_section">
        <h4 className="text-center my-3">مدیریت رنگ‌ها</h4>
        <AddColor setData={setData} />
        <DataTable
          data={data}
          itemsInTable={itemsInTable}
          additionalColumn={additionalColumn}
          itemsInPage={12}
          searchField={["title", "code"]}
          isLoading={isLoading}
        ></DataTable>
      </div>
    </ColorsProvider>
  );
};

export default Colors;

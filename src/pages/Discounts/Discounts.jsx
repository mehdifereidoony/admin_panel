import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import ActionsDiscount from "./components/ActionsDiscount";
import { getDiscountsService } from "../../services/discountService";
import { useNotification } from "../../context/notificationContext";

const Discounts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addNotification = useNotification();
  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "code", title: "کد تخفیف" },
    { field: "percent", title: "درصد تخفیف " },
  ];
  const additionalColumn = [
    {
      title: "فعال",
      value: (row) => <span>{row.is_active ? "هست" : "نیست"}</span>,
    },
    {
      title: "عملیات",
      value: (row) => <ActionsDiscount data={row} />,
    },
  ];

  useEffect(() => {
    const getDiscounts = async () => {
      try {
        setIsLoading(true);
        const res = await getDiscountsService();
        setIsLoading(false);
        if (res.status == 200) {
          setData(res.data.data);
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      }
    };
    getDiscounts();
  }, []);
  return (
    <div
      id="manage_color_section"
      className="manage_color_section main_section"
    >
      <h4 className="text-center my-3">مدیریت تخفیف ها</h4>

      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={12}
        searchField={["title", "code"]}
        isLoading={isLoading}
      ></DataTable>
    </div>
  );
};

export default Discounts;

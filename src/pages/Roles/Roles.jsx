import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import DataTable from "../../components/common/DataTable";
import ActionsRole from "./components/ActionsRole";
import {
  getRolesService,
  deleteRolesService,
} from "../../services/userService";
import { useNotification } from "../../context/notificationContext";

const Roles = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addNotification = useNotification();

  const deleteRole = async (rowData) => {
    if (confirm(`آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
      try {
        const res = await deleteRolesService(rowData.id);

        if (res.status === 200) {
          addNotification("success", `${rowData.title} با موفقیت حذف شد`);

          setData((oldData) =>
            oldData.filter((role) => role.id !== rowData.id),
          );
        }
      } catch (error) {
        console.log(error);
        addNotification("error", "خطایی رخ داده");
      }
    }
  };

  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان نقش" },
    { field: "description", title: "توضیحات" },
  ];

  const additionalColumn = [
    {
      title: "عملیات",
      value: (row) => <ActionsRole data={row} deleteRole={deleteRole} />,
    },
  ];

  useEffect(() => {
    const getRoles = async () => {
      try {
        setIsLoading(true);

        const res = await getRolesService();

        if (res.status === 200) {
          setData(res.data.data);
        }
      } catch (error) {
        console.log(error);
        addNotification("error", "خطایی رخ داده");
      } finally {
        setIsLoading(false);
      }
    };

    getRoles();
  }, []);

  return (
    <div id="manage_role_section" className="manage_role_section main_section">
      <h4 className="text-center my-3">مدیریت نقش‌ها</h4>

      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={12}
        searchField={["title", "description"]}
        isLoading={isLoading}
      ></DataTable>
    </div>
  );
};

export default Roles;

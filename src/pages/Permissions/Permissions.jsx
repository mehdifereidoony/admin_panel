import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { getPermissionsService } from "../../services/userService";
import { useNotification } from "../../context/notificationContext";

const Permissions = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addNotification = useNotification();

  const itemsInTable = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "description", title: "توضیحات" },
    { field: "category", title: "مربوط به" },
  ];

  useEffect(() => {
    const getPermissions = async () => {
      try {
        setIsLoading(true);

        const res = await getPermissionsService();

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

    getPermissions();
  }, []);

  return (
    <div
      id="manage_permission_section"
      className="manage_permission_section main_section"
    >
      <h4 className="text-center my-3">مدیریت دسترسی‌ها</h4>

      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        itemsInPage={12}
        searchField={["title", "description"]}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Permissions;

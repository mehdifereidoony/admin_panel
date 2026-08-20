import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";

import DataTable from "../../components/common/DataTable";
import ActionsUser from "./components/ActionsUser";

import { useNotification } from "../../context/notificationContext";
import {
  deleteUsersService,
  getUsersService,
} from "../../services/userService";

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addNotification = useNotification();

  const deleteUser = async (rowData) => {
    if (
      confirm(`آیا از حذف ${rowData.user_name || rowData.phone} اطمینان دارید؟`)
    ) {
      try {
        const res = await deleteUsersService(rowData.id);

        if (res.status === 200) {
          addNotification(
            "success",
            `${rowData.user_name || rowData.phone} با موفقیت حذف شد`,
          );

          setData((oldData) =>
            oldData.filter((item) => item.id !== rowData.id),
          );
        }
      } catch (error) {
        console.log(error);
        addNotification("error", "خطایی رخ داده");
      }
    }
  };

  const itemsInTable = [
    {
      field: "id",
      title: "#",
    },
    {
      field: "user_name",
      title: "نام کاربری",
    },
    {
      field: "first_name",
      title: "نام",
    },
    {
      field: "last_name",
      title: "نام خانوادگی",
    },
    {
      field: "phone",
      title: "موبایل",
    },
    {
      field: "email",
      title: "ایمیل",
    },
  ];

  const additionalColumn = [
    {
      title: "جنسیت",
      value: (row) => {
        if (row.gender === 1) return "مرد";
        if (row.gender === 0) return "زن";

        return "-";
      },
    },
    {
      title: "نقش‌ها",
      value: (row) =>
        row.roles?.length
          ? row.roles.map((role) => role.title).join(" ، ")
          : "-",
    },
    {
      title: "فعال",
      value: (row) => <span>{row.is_active ? "هست" : "نیست"}</span>,
    },
    {
      title: "عملیات",
      value: (row) => <ActionsUser data={row} deleteUser={deleteUser} />,
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);

        const res = await getUsersService();

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

    getUsers();
  }, []);

  return (
    <div
      id="manage_users_section"
      className="manage_users_section main_section"
    >
      <h4 className="text-center my-3">مدیریت کاربران</h4>

      <DataTable
        data={data}
        itemsInTable={itemsInTable}
        additionalColumn={additionalColumn}
        itemsInPage={12}
        searchField={["user_name", "first_name", "last_name", "phone", "email"]}
        isLoading={isLoading}
      >
        <Link
          to="add-user"
          className="btn btn-success d-flex justify-content-center align-items-center"
        >
          <i className="fas fa-plus text-light"></i>
        </Link>

        <Outlet context={{ setData }} />
      </DataTable>
    </div>
  );
};

export default Users;

import { useNavigate } from "react-router";

const ActionsUser = ({ data, deleteUser }) => {
  const navigate = useNavigate();

  return (
    <>
      <i
        onClick={() =>
          navigate("add-user", {
            state: { data },
          })
        }
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کاربر"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_user_modal"
      ></i>

      <i
        onClick={() => deleteUser(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کاربر"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};

export default ActionsUser;

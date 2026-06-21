import { useNavigate } from "react-router";

const Actions = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <i
        onClick={() =>
          navigate(`/categories/${data.id}`, {
            state: {
              parentData: data,
            },
          })
        }
        className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
        title="زیرمجموعه"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
      <i
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_product_category_modal"
      ></i>
      <i
        id={data.id}
        className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_attr_modal"
      ></i>
      <i
        id={data.id}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};
export default Actions;

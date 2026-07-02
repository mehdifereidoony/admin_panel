import { useNavigate, useParams } from "react-router";
import { useCategories } from "../../../context/categoriesContext";

const Actions = ({ data, deleteCategory }) => {
  const navigate = useNavigate();
  const { setEdited } = useCategories();
  const params = useParams();

  return (
    <>
      {!params.parentId && (
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
      )}
      <i
        onClick={() => setEdited(data)}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_product_category_modal"
      ></i>
      {params.parentId && (
        <i
          onClick={() =>
            navigate(`/categories/${data.id}/attributes`, {
              state: {
                parentData: data,
              },
            })
          }
          id={data.id}
          className="fas fa-book text-success mx-1 hoverable_text pointer has_tooltip"
          title="افزودن ویژگی"
        ></i>
      )}
      <i
        onClick={() => deleteCategory(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};
export default Actions;

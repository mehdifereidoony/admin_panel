import { useNavigate } from "react-router";

const ActionsProducts = ({ data, deleteProduct }) => {
  const navigate = useNavigate();
  return (
    <>
      <i
        onClick={() =>
          navigate("edit-product", {
            state: { data: data },
          })
        }
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_brand_modal"
      ></i>
      <i
        onClick={() => deleteProduct(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};
export default ActionsProducts;

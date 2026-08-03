import { useNavigate } from "react-router"

const ActionsDiscount = ({ data, deleteDiscount }) => {
  const navigate = useNavigate()
  return (
    <>
      <i
        onClick={() => navigate("add-discount",{
          state: {data}
        })}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کدتخفیف"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_color_modal"
      ></i>
      <i
        onClick={() => deleteDiscount(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کدتخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};

export default ActionsDiscount;

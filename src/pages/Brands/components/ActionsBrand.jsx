import { useBrands } from "../../../context/brandsContext";

const ActionsBrands = ({ data }) => {
  const { setEdited } = useBrands();
  return (
    <>
      <i
        onClick={() => setEdited(data)}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_brand_modal"
      ></i>
      <i
        onClick={() => console.log(data.id)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};
export default ActionsBrands;

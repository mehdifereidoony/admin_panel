const ActionsBrands = ({ data }) => {
  return (
    <>
      <i
        onClick={() => console.log(data.id)}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_product_category_modal"
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

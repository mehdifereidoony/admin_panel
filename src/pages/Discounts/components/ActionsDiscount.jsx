const ActionsDiscount = ({ data }) => {
  return (
    <>
      <i
        onClick={() => console.log(data)}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش رنگ"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_color_modal"
      ></i>
      <i
        onClick={() => console.log(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف رنگ"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};

export default ActionsDiscount;

const ActionsDiscount = ({ data, deleteRole }) => {
  return (
    <>
      <i
        onClick={() => console.log(data.id)}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش رول"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_color_modal"
      ></i>
      <i
        onClick={() => deleteRole(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف رول"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};

export default ActionsDiscount;

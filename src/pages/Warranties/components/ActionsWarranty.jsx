import { useWarranties } from "../../../context/warrantiesContext";

const ActionsWarranty = ({ data, deleteWarranties }) => {
  const { setEdited } = useWarranties();
  return (
    <>
      <i
        onClick={() => setEdited(data)}
        id={data.id}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش گارانتی"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_warranty_modal"
      ></i>
      <i
        onClick={() => deleteWarranties(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف گارانتی"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};

export default ActionsWarranty;

const Actions = ({ data, edited, setEdited, deleteAttribute }) => {
  return (
    <div className={`${edited && edited.id === data.id ? "bg-active" : ""}`}>
      <i
        onClick={() => setEdited(data)}
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
      ></i>
      <i
        onClick={() => deleteAttribute(data)}
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </div>
  );
};
export default Actions;

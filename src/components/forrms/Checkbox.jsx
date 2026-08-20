const Checkbox = ({ label, error, id, miniBox, ...props }) => {
  return (
    <>
      <div className={`form-check form-switch col-5  ${miniBox? "": "col-md-2"}`}>
        <input
          className="form-check-input pointer"
          type="checkbox"
          id={id}
          {...props}
        />
        <label className="form-check-label pointer" htmlFor={id}>
          {label}
        </label>
      </div>

      {error && <small className="text-danger"> {error} </small>}
    </>
  );
};

export default Checkbox;

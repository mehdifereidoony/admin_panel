const Select = ({ label,error, className, options = [], ...props }) => {
  return (
    <>
    <div className={`col-12 ${className} `}>
      <div className="input-group mb-3" style={{ direction: "ltr" }}>
        <select className="form-control" {...props}>
          <option value="">انتخاب کنید</option>
          {options.map((i) => (
            <option key={i.value} value={i.value}>
              {i.title}
            </option>
          ))}
        </select>
        <span className="input-group-text w_6rem justify-content-center">
          {label}
        </span>
      </div>
    </div>
    {error && <small className="text-danger"> {error} </small>}
    </>
  );
};

export default Select;

const Input = ({ label, error, type, className, ...props }) => {
  return (
    <>
      <div className={`col-12 ${className}`}>
        <div className="input-group mb-3" style={{ direction: "ltr" }}>
          <input type={type} className="form-control" {...props} />
          <span className="input-group-text w_6rem justify-content-center">
            {label}
          </span>
        </div>
      </div>
      {error && <small className="text-danger"> {error} </small>}
    </>
  );
};

export default Input;

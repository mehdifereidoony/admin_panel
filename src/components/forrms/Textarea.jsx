const Textarea = ({ label, error, className, ...props }) => {
  return (
    <>
      <div className={`col-12 ${className}`}>
        <div className="input-group mb-3" style={{ direction: "ltr" }}>
          <textarea
            type="text"
            className="form-control"
            rows="5"
            {...props}
          ></textarea>
          <span className="input-group-text w_6rem justify-content-center">
            {label}
          </span>
        </div>
      </div>
      {error && <small className="text-danger"> {error} </small>}
    </>
  );
};

export default Textarea;

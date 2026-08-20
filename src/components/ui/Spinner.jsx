const Spinner = ({ className, isSmall, isBlock }) => {
  return (
    <div
      className={`spinner-border ${className} ${
        isSmall ? "spinner-border-sm" : ""
      } ${isBlock ? "d-block" : ""}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;

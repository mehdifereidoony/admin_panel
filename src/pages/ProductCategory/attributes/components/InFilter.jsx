const InFilter = ({ in_filter }) => {
  return (
    <p className={`${in_filter ? "text-success" : "text-danger"}`}>
      {in_filter ? "هست" : "نیست"}
    </p>
  );
};

export default InFilter;

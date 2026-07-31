const ShowProductCategories = (data) => {
  return (
    <div>
      {data.data.categories.map((category) => (
        <span className="chips_elem" key={category.id}>
          {category.title}
        </span>
      ))}
    </div>
  );
};

export default ShowProductCategories;

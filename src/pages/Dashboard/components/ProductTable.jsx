const ProductTable = ({ title, products }) => {
  return (
    <div className="col-12 col-lg-6">
      <p className="text-center mt-3 text-dark">{title}</p>

      <table className="table table-responsive text-center table-hover table-bordered no_shadow_back_table font_08">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>دسته</th>
            <th>عنوان</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>
                {product.status}({product.remainingCount})
              </td>
              <td>
                <i
                  className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                  title="نادیده گرفتن"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

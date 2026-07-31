import Spinner from "../../../components/ui/Spinner";

const ProductDataTable = ({
  children,
  data,
  isLoading,
  itemsInTable,
  additionalColumn,
  currentPage,
  setCurrentPage,
  pageCount,
  setSearchField,
  searchField,
  breadCount,
}) => {
  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      {/* top box  */}
      <div className="row justify-content-between">
        {/* search  */}
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3" style={{ direction: "rtl" }}>
            <input
              value={searchField}
              onChange={(e) => handleSearch(e)}
              type="text"
              className="form-control"
              placeholder="قسمتی از عنوان را وارد کنید"
            />
            <span className="input-group-text">جستجو</span>
          </div>
        </div>
        {/* children  */}
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner className="text-primary" />
        </div>
      ) : data.length ? (
        <>
          {/* table  */}
          <table className="table table-responsive text-center table-hover table-bordered">
            <thead className="table-secondary">
              <tr>
                {itemsInTable.map((i) => (
                  <th key={i.field}>{i.title}</th>
                ))}
                {additionalColumn.map((a) => (
                  <th key={a.title}>{a.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id}>
                  {itemsInTable.map((i) => (
                    <td key={i.field + "-" + d.id}>{d[i.field]}</td>
                  ))}
                  {additionalColumn.map((a) => (
                    <td key={a.title}>{a.value(d)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* page navigation  */}
          {pageCount > 1 ? (
            <nav
              aria-label="Page navigation example"
              className="d-flex justify-content-center"
            >
              <ul className="pagination dir_ltr">
                <li
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`page-item ${currentPage <= 1 && "disable"}`}
                >
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>

                {currentPage > breadCount + 2 ? (
                  <>
                    <li className={`page-item `}>
                      <a
                        onClick={() => setCurrentPage(1)}
                        className="page-link"
                        href="#"
                      >
                        1
                      </a>
                    </li>
                    <li className={`page-item disable`}>
                      <a className="page-link" href="#">
                        ...
                      </a>
                    </li>
                  </>
                ) : null}

                {[...Array(pageCount)].map((_, index) => {
                  const page = index + 1;

                  return page <= currentPage + breadCount &&
                    page >= currentPage - breadCount ? (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page && "active"
                      }`}
                    >
                      <a
                        onClick={() => setCurrentPage(page)}
                        className="page-link"
                        href="#"
                      >
                        {page}
                      </a>
                    </li>
                  ) : null;
                })}

                {currentPage < pageCount - breadCount - 1 ? (
                  <>
                    <li className={`page-item disable`}>
                      <a className="page-link" href="#">
                        ...
                      </a>
                    </li>
                    <li className={`page-item`}>
                      <a
                        onClick={() => setCurrentPage(pageCount)}
                        className="page-link"
                        href="#"
                      >
                        {pageCount}
                      </a>
                    </li>
                  </>
                ) : null}

                <li
                  className={`page-item ${
                    currentPage >= pageCount && "disable"
                  }`}
                >
                  <a
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="page-link"
                    href="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </>
      ) : (
        <h5 className="text-danger text-center">هیچ موردی یافت نشد</h5>
      )}
    </>
  );
};
export default ProductDataTable;

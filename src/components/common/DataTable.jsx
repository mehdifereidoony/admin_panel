import { useEffect, useState } from "react";

const DataTable = ({
  children,
  data,
  itemsInTable,
  additionalColumn,
  itemsInPage,
  searchField,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredData = search
    ? data.filter((item) =>
        searchField.some((field) =>
          item[field]?.toString()?.toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  const start = (currentPage - 1) * itemsInPage;
  const end = start + itemsInPage;

  const items = filteredData.slice(start, end);

  const pages = [];
  for (let i = 0; i < Math.ceil(filteredData.length / itemsInPage); i++) {
    pages.push(i + 1);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  return (
    <>
      {/* top box  */}
      <div className="row justify-content-between">
        {/* search  */}
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3" style={{ direction: "rtl" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
      {/* table  */}
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            {itemsInTable.map((i) => (
              <th key={i.field}>{i.title}</th>
            ))}
            {additionalColumn && <th>{additionalColumn.title}</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.id}>
              {itemsInTable.map((i) => (
                <td key={i.field + "-" + d.id}>{d[i.field]}</td>
              ))}
              {additionalColumn && <td>{additionalColumn.value(d.id)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {/* page navigation  */}
      {pages.length > 1 ? (
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

            {pages.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page && "active"}`}
              >
                <a
                  onClick={() => setCurrentPage(page)}
                  className="page-link"
                  href="#"
                >
                  {page}
                </a>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage >= pages.length && "disable"
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
  );
};
export default DataTable;

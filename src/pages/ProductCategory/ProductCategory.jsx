const ProductCategory = () => {
  return (
    <div
      id="manage_product_category"
      className="manage_product_category main_section d-none"
    >
      <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3" style="direction: ltr;">
            <input
              type="text"
              className="form-control"
              placeholder="قسمتی از عنوان را وارد کنید"
            />
            <span className="input-group-text">جستجو</span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          <button
            className="btn btn-success d-flex justify-content-center align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add_product_category_modal"
          >
            <i className="fas fa-plus text-light"></i>
          </button>
        </div>
      </div>
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>دسته شماره فلان</td>
            <td>فعال</td>
            <td>
              <i
                className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                title="زیرمجموعه"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته"
                data-bs-toggle="modal"
                data-bs-placement="top"
                data-bs-target="#add_product_category_modal"
              ></i>
              <i
                className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
                title="افزودن ویژگی"
                data-bs-toggle="modal"
                data-bs-target="#add_product_category_attr_modal"
              ></i>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>دسته شماره فلان</td>
            <td>فعال</td>
            <td>
              <i
                className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                title="زیرمجموعه"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
                title="افزودن ویژگی"
                data-bs-placement="top"
                data-bs-toggle="modal"
                data-bs-target="#add_product_category_attr_modal"
              ></i>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>دسته شماره فلان</td>
            <td>فعال</td>
            <td>
              <i
                className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                title="زیرمجموعه"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
                title="افزودن ویژگی"
                data-bs-placement="top"
                data-bs-toggle="modal"
                data-bs-target="#add_product_category_attr_modal"
              ></i>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>دسته شماره فلان</td>
            <td>فعال</td>
            <td>
              <i
                className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                title="زیرمجموعه"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
              <i
                className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
                title="افزودن ویژگی"
                data-bs-placement="top"
                data-bs-toggle="modal"
                data-bs-target="#add_product_category_attr_modal"
              ></i>
              <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductCategory;

{
  /* <div class="modal fade" id="add_product_category_modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title flex-fill" id="exampleModalLabel">افزودن دسته محصولات</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group mb-3" style="direction: ltr;">
                                <select type="text" class="form-control">
                                    <option value="1">بدون والد</option>
                                    <option value="1">دسته شماره 1</option>
                                </select>
                                <span class="input-group-text w_6rem justify-content-center">دسته والد</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group mb-3" style="direction: ltr;">
                                <input type="text" class="form-control" placeholder="عنوان دسته">
                                <span class="input-group-text w_6rem justify-content-center">عنوان</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group mb-3" style="direction: ltr;">
                                <textarea type="text" class="form-control" placeholder="توضیحات" rows="5"></textarea>
                                <span class="input-group-text w_6rem justify-content-center">توضیحات</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group mb-3" style="direction: ltr;">
                                <input type="file" class="form-control" placeholder="تصویر">
                                <span class="input-group-text w_6rem justify-content-center">تصویر</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8 row justify-content-center">
                            <div class="form-check form-switch col-5 col-md-2">
                                <input class="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" checked>
                                <label class="form-check-label pointer" for="flexSwitchCheckDefault">وضعیت فعال</label>
                            </div>
                        </div>
                        <div class="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                            <button class="btn btn-primary ">ذخیره</button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">انصراف</button>
            </div>
          </div>
        </div>
    </div> */
}

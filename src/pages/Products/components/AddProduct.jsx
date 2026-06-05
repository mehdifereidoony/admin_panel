import Modal from "../../../components/common/Modal";

const AddProduct = () => {
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <Modal id="add_product_modal" title="افزودن محصول جدید" fullScreen={true}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-8">
              <div className="input-group mb-2" style={{ direction: "ltr" }}>
                <select className="form-control">
                  <option>انتخاب دسته محصول</option>
                  <option>دسته شماره 1</option>
                </select>
                <span className="input-group-text w_6rem text-center">
                  دسته
                </span>
              </div>

              <div className="mb-3">
                <span className="chips_elem">دسته فلان</span>
                <span className="chips_elem">دسته فلان</span>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-8">
              <div className="input-group mb-3" style={{ direction: "ltr" }}>
                <input className="form-control" placeholder="عنوان محصول" />
                <span className="input-group-text">عنوان</span>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-8">
              <div className="input-group mb-3" style={{ direction: "ltr" }}>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="توضیحات"
                />
                <span className="input-group-text">توضیحات</span>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
              <div className="form-check form-switch col-5 col-md-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="activeSwitch"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="activeSwitch">
                  وضعیت فعال
                </label>
              </div>
            </div>

            <div className="text-center col-12 col-md-6 col-lg-8 mt-4">
              <button className="btn btn-primary">ذخیره</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProduct;

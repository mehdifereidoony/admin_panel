import Modal from "../../../components/common/Modal";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";

const AddCategory = () => {
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <Modal
        id="add_product_category_modal"
        title="افزودن دسته جدید"
        fullScreen={true}
      >
        <div className="container">
          <div className="row justify-content-center">
            <FormController
              control="input"
              type="text"
              label="نام"
              className="col-md-6 col-lg-8"
              placeholder="نام دسته"
            />
            <FormController
              control="select"
              label="دسته والد"
              className="col-md-6 col-lg-8"
              options={[
                { value: "a", title: "آ" },
                { value: "b", title: "b" },
              ]}
            />
            <FormController
              control="textarea"
              label="توضیحات"
              className="col-md-6 col-lg-8"
              placeholder="توضیحات"
            />
            <FormController
              control="fileField"
              label="تصویر"
              className="col-md-6 col-lg-8"
            />
            <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
              <FormController
                control="checkbox"
                label="وضعیت فعال"
                id="is_active"
              />
              <FormController
                control="checkbox"
                label="نمایش در منو"
                id="show_in_menu"
              />
            </div>
            <SubmitButton title="ذخیره" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;

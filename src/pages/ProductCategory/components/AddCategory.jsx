import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoriesSchema } from "../../../schema/CategoriesSchema";
import { useEffect, useState } from "react";
import {
  addCategoriesService,
  getCategories,
} from "../../../services/categoryService";
import { useNotification } from "../../../context/notificationContext";

const AddCategory = ({ setRefresh }) => {
  const addNotification = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(categoriesSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    try {
      const res = await addCategoriesService({
        ...data,
        show_in_menu: data.show_in_menu ? 1 : 0,
        is_active: data.is_active ? 1 : 0,
      });
      if (res.status == 201) {
        addNotification("success", "دسته با موفقیت ثبت شد");
        reset();
        setRefresh((prev) => !prev);
      } else {
        addNotification("error", res.data.title || "خطایی رخ داده");
      }
    } catch {
      addNotification("error", "مشکلی از سمت سرور رخ داد");
    }
  };
  const [parent_categories, setParent_categories] = useState([]);
  useEffect(() => {
    const getParentCat = async () => {
      const res = await getCategories();
      if (res.status == 200) {
        const items = res.data.data;
        setParent_categories(
          items.map((i) => {
            return { value: i.id, title: i.title };
          })
        );
      }
    };
    getParentCat();
  }, []);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormController
                control="input"
                type="text"
                label="نام"
                error={errors.title?.message}
                className="col-md-6 col-lg-8"
                {...register("title")}
                placeholder="نام دسته"
              />
              <FormController
                control="select"
                label="دسته والد"
                error={errors.parent_id?.message}
                className="col-md-6 col-lg-8"
                options={parent_categories}
                {...register("parent_id")}
              />
              <FormController
                control="textarea"
                label="توضیحات"
                error={errors.descriptions?.message}
                className="col-md-6 col-lg-8"
                {...register("descriptions")}
                placeholder="توضیحات"
              />
              <FormController
                control="fileField"
                label="تصویر"
                error={errors.image?.message}
                className="col-md-6 col-lg-8"
                {...register("image")}
              />
              <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                <FormController
                  control="checkbox"
                  label="وضعیت فعال"
                  error={errors.is_active?.message}
                  id="is_active"
                  {...register("is_active")}
                />
                <FormController
                  control="checkbox"
                  label="نمایش در منو"
                  error={errors.show_in_menu?.message}
                  id="show_in_menu"
                  {...register("show_in_menu")}
                />
              </div>
              <SubmitButton
                isDirty={isDirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                title="ذخیره"
              />
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;

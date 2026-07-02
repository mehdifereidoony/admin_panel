import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandsSchema } from "../../../schema/brandsSchema";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { useNotification } from "../../../context/notificationContext";
import { addBrandsService } from "../../../services/brandService";

const AddBrand = ({ setData }) => {
  const addNotification = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(brandsSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      let res;
      res = await addBrandsService(data);

      if (res.status == 201 || res.status == 200) {
        addNotification("success", `${"دسته با موفقیت ثبت شد"}`);
        setData((oldData) => [
          ...oldData,
          {
            id: res.data.data.id,
            original_name: res.data.data.original_name,
            persian_name: res.data.data.persian_name,
            descriptions: res.data.data.descriptions,
          },
        ]);
      } else {
        console.log(res);
        addNotification("error", res.data.title || "خطایی رخ داده");
      }
    } catch (error) {
      console.log(error);
      addNotification("error", "مشکلی از سمت سرور رخ داد");
    }
  };
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_brand_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <Modal title={`افزودن برند`} id="add_brand_modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-center ">
              <FormController
                control="input"
                type="text"
                label="عنوان لاتین برند"
                error={errors.original_name?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("original_name")}
                placeholder="کیبرد را در حالت لاتین قرار دهید"
              />
              <FormController
                control="input"
                type="text"
                label="عنوان فارسی برند"
                error={errors.persian_name?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("persian_name")}
                placeholder="کیبرد را در حالت فارسی قرار دهید"
              />
              <FormController
                control="input"
                type="text"
                label=" توضیحات برند"
                error={errors.descriptions?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("descriptions")}
                placeholder="متن کوتاه در مورد برند"
              />
              <FormController
                control="fileField"
                label="تصویر"
                error={errors.logo?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("logo")}
              />
              <SubmitButton
                isDirty={isDirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                title="ذخیره"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddBrand;

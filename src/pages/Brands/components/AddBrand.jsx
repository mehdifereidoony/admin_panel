import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandsSchema } from "../../../schema/brandsSchema";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { useNotification } from "../../../context/notificationContext";
import {
  addBrandsService,
  editBrandsService,
} from "../../../services/brandService";
import { useBrands } from "../../../context/brandsContext";
import { useEffect } from "react";

const AddBrand = ({ setData }) => {
  const { edited, setEdited } = useBrands();
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
    try {
      let res;
      if (!edited) {
        res = await addBrandsService(data);
      } else {
        res = await editBrandsService(edited.id, data);
      }

      if (res.status == 201) {
        addNotification("success", "برند با موفقیت ثبت شد");
        setData((oldData) => [
          ...oldData,
          {
            id: res.data.data.id,
            original_name: res.data.data.original_name,
            persian_name: res.data.data.persian_name,
            descriptions: res.data.data.descriptions,
            logo: res.data.data.logo,
          },
        ]);
        reset();
      } else if (res.status == 200) {
        addNotification("success", "برند باموفقیت ویرایش شد");
        setData((oldData) => {
          const data = [...oldData];
          const index = data.findIndex((d) => d.id == edited.id);
          data[index] = res.data.data;
          return data;
        });
      } else {
        console.log(res);
        addNotification("error", res.data.title || "خطایی رخ داده");
      }
    } catch (error) {
      console.log(error);
      addNotification("error", "مشکلی از سمت سرور رخ داد");
    }
  };
  useEffect(() => {
    if (!edited) {
      reset({
        original_name: "",
        persian_name: "",
        descriptions: "",
        logo: null,
      });
    } else {
      reset({
        original_name: edited.original_name,
        persian_name: edited.persian_name,
        descriptions: edited.descriptions || "",
        logo: null,
      });
    }
  }, [edited]);
  return (
    <>
      <button
        onClick={() => setEdited(null)}
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

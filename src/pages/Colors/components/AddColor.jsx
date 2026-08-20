import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorsSchema } from "../../../schema/colorsSchema";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { useNotification } from "../../../context/notificationContext";
import { addColorsService, editColorsService } from "../../../services/colorService";
import { useColors } from "../../../context/colorsContext";
import { useEffect } from "react";

const AddColor = ({ setData }) => {
  const { edited, setEdited } = useColors();
  const addNotification = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(colorsSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const colorCode = watch("code");
  const onSubmit = async (data) => {
    try {
      let res;
      if (!edited) {
        res = await addColorsService(data);
      } else {
        res = await editColorsService(edited.id, data);
      }

      if (res.status == 201) {
        addNotification("success", "رنگ با موفقیت ثبت شد");
        setData((oldData) => [...oldData, res.data.data]);
        reset();
      } else if (res.status == 200) {
        addNotification("success", "رنگ با موفقیت ویرایش شد");
        setData((oldData) => {
          const newData = [...oldData];
          const index = newData.findIndex((d) => d.id == edited.id);
          newData[index] = res.data.data || { ...edited, ...data };
          return newData;
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
        title: "",
        code: "#ffffff",
      });
    } else {
      reset({
        title: edited.title,
        code: edited.code,
      });
    }
  }, [edited, reset]);
  return (
    <>
      <button
        onClick={() => setEdited(null)}
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_color_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <Modal title={edited ? "ویرایش رنگ" : "افزودن رنگ"} id="add_color_modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-center ">
              <FormController
                control="input"
                type="text"
                label="عنوان رنگ"
                error={errors.title?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("title")}
                placeholder="مثلاً سفید"
              />
              <FormController
                control="input"
                type="text"
                label="کد رنگ"
                error={errors.code?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("code")}
                placeholder="#ffffff"
              />
              <div className="col-md-6 col-lg-8 w-100 mb-3 d-flex align-items-center gap-2">
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={colorCode || "#ffffff"}
                  onChange={(e) =>
                    setValue("code", e.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
                <span className="text-muted">انتخاب از پالت رنگ</span>
              </div>
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

export default AddColor;

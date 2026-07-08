import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { warrantiesSchema } from "../../../schema/warrantiesSchema";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { useNotification } from "../../../context/notificationContext";
import {
  addWarrantiesService,
  editWarrantiesService,
} from "../../../services/warrantyService";
import { useWarranties } from "../../../context/warrantiesContext";
import { useEffect } from "react";

const lengthUnitOptions = [
  { value: "year", title: "سال" },
  { value: "month", title: "ماه" },
  { value: "day", title: "روز" },
];

const AddWarranties = ({ setData }) => {
  const { edited, setEdited } = useWarranties();
  const addNotification = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(warrantiesSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    try {
      let res;
      if (!edited) {
        res = await addWarrantiesService(data);
      } else {
        res = await editWarrantiesService(edited.id, data);
      }

      if (res.status == 201) {
        addNotification("success", "گارانتی با موفقیت ثبت شد");
        setData((oldData) => [...oldData, res.data.data]);
        reset();
      } else if (res.status == 200) {
        addNotification("success", "گارانتی با موفقیت ویرایش شد");
        setData((oldData) => {
          const newData = [...oldData];
          const index = newData.findIndex((d) => d.id == edited.id);
          newData[index] = res.data.data;
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
        descriptions: "",
        length: "",
        length_unit: "",
      });
    } else {
      reset({
        title: edited.title,
        descriptions: edited.descriptions || "",
        length: edited.length,
        length_unit: edited.length_unit,
      });
    }
  }, [edited, reset]);
  return (
    <>
      <button
        onClick={() => setEdited(null)}
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_warranty_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <Modal
        title={edited ? "ویرایش گارانتی" : "افزودن گارانتی"}
        id="add_warranty_modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-center ">
              <FormController
                control="input"
                type="text"
                label="عنوان گارانتی"
                error={errors.title?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("title")}
                placeholder="مثلاً گارانتی ۱۸ ماهه"
              />
              <FormController
                control="input"
                type="text"
                label="توضیحات"
                error={errors.descriptions?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("descriptions")}
                placeholder="توضیحات گارانتی"
              />
              <FormController
                control="input"
                type="number"
                label="مقدار اعتبار"
                error={errors.length?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("length")}
                placeholder="مثلاً 18"
              />
              <FormController
                control="select"
                label="واحد اعتبار"
                error={errors.length_unit?.message}
                className="col-md-6 col-lg-8 w-100"
                options={lengthUnitOptions}
                {...register("length_unit")}
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

export default AddWarranties;

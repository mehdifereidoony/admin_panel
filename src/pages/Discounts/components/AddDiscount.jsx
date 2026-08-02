import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { discountSchema } from "../../../schema/discountSchema";

const AddDiscount = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(discountSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <>
      <Modal title={`افزودن برند`} id="add_discount_modal" isOpen={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-center ">
              <FormController
                control="input"
                type="text"
                label="عنوان"
                error={errors.title?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("title")}
                placeholder="عنوان را وارد کنید"
              />
              <FormController
                control="input"
                type="text"
                label="کد تخفیف"
                error={errors.code?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("code")}
                placeholder="کد تخفیف را وارد کنید. "
              />
              <FormController
                control="date"
                name="expire_at"
                formControl={control}
                label="تاریخ انقضا"
                error={errors.expire_at?.message}
                className="col-md-6"
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

export default AddDiscount;

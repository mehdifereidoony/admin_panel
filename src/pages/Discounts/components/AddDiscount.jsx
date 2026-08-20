import { useForm } from "react-hook-form";
import Modal from "../../../components/common/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import FormController from "../../../components/forrms/FormController";
import SubmitButton from "../../../components/forrms/SubmitButton";
import { discountSchema } from "../../../schema/discountSchema";
import { useEffect, useState } from "react";
import { getProductsService } from "../../../services/productService";
import {
  createDiscountsService,
  editDiscountsService,
} from "../../../services/discountService";
import { useNotification } from "../../../context/notificationContext";
import { useLocation, useOutletContext } from "react-router";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import { convertShamsiToGregorian } from "../../../utils/formatDate";

const AddDiscount = () => {
  const [products, setProducts] = useState([]);

  const { setData } = useOutletContext();
  const addNotification = useNotification();

  const location = useLocation();
  const discount = location.state?.data;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(discountSchema),
    mode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      title: "",
      code: "",
      percent: "",
      expire_at: null,
      for_all: false,
      product_ids: [],
    },
  });

  const for_all = watch("for_all");

  // گرفتن محصولات
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getProductsService();

        if (res.status === 200) {
          setProducts(
            res.data.data.map((product) => ({
              value: product.id,
              label: product.title,
            })),
          );
        }
      } catch {
        console.log("error");
      }
    };

    getProducts();
  }, []);

  // پر کردن فرم در حالت Edit
  useEffect(() => {
    if (!discount) return;

    reset({
      title: discount.title,

      code: discount.code,

      percent: discount.percent,

      expire_at: new DateObject({
        date: discount.expire_at,
        calendar: gregorian,
      }),

      for_all: Boolean(discount.for_all),

      product_ids: discount.products?.map((product) => product.id) || [],
    });
  }, [discount, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        expire_at: convertShamsiToGregorian(formData.expire_at),
        product_ids: formData.product_ids?.join("-") || "",
      };

      let res;

      if (discount) {
        res = await editDiscountsService(discount.id, payload);
      } else {
        res = await createDiscountsService(payload);
      }

      if (res.status === 200 || res.status === 201) {
        addNotification(
          "success",
          discount ? "تخفیف با موفقیت ویرایش شد" : "تخفیف با موفقیت ایجاد شد",
        );

        if (discount) {
          setData((oldData) =>
            oldData.map((item) =>
              item.id === discount.id ? res.data.data : item,
            ),
          );
        } else {
          setData((oldData) => [...oldData, res.data.data]);
        }
      }
    } catch (error) {
      console.log(error);

      addNotification("error", "خطایی رخ داده");
    }
  };

  return (
    <>
      <Modal
        title={discount ? "ویرایش تخفیف" : "افزودن تخفیف"}
        id="add_discount_modal"
        isOpen={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justifyContent-center">
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
                placeholder="کد تخفیف را وارد کنید"
              />

              <FormController
                control="input"
                type="number"
                label="درصد تخفیف"
                error={errors.percent?.message}
                className="col-md-6 col-lg-8 w-100"
                {...register("percent")}
                placeholder="درصد تخفیف را وارد کنید"
              />

              <FormController
                control="date"
                name="expire_at"
                formControl={control}
                label="تاریخ انقضا"
                error={errors.expire_at?.message}
                className="col-md-6 w-100"
              />

              <div className="col-12 col-md-6 col-lg-8 row justify-content-center w-100">
                <FormController
                  control="checkbox"
                  label="برای همه محصولات"
                  error={errors.for_all?.message}
                  id="for_all"
                  miniBox={true}
                  {...register("for_all")}
                />
              </div>

              {for_all ? null : (
                <FormController
                  control="multiSelect"
                  name="product_ids"
                  label="محصولات"
                  formControl={control}
                  options={products}
                  error={errors.product_ids?.message}
                  className="col-md-6 col-lg-8 w-100"
                />
              )}

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

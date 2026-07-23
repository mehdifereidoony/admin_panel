import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsSchema } from "../../../schema/productsSchema";
import SubmitButton from "../../../components/forrms/SubmitButton";
import FormController from "../../../components/forrms/FormController";
import { useEffect, useState } from "react";
import { getCategoriesService } from "../../../services/categoryService";
import { useNotification } from "../../../context/notificationContext";
import { getBrandsService } from "../../../services/brandService";
import { getColorsService } from "../../../services/colorService";
import { getWarrantiesService } from "../../../services/warrantyService";
import { addProductService } from "../../../services/productService";
import PrevPageButton from "../../../components/common/PrevPageButton";
import { useLocation } from "react-router";

const AddProduct = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [ChildCategories, setChildCategories] = useState([]);
  const [loadingGetChild, setLoadingGetChild] = useState(false);
  const [brands, setBrands] = useState([]);
  const [color, setColor] = useState([]);
  const [warranties, setWarranties] = useState([]);

  const location = useLocation();

  const product = location.state?.data;
  const isEdit = !!product;
  const addNotification = useNotification();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(productsSchema),
  });
  const selectedPCategory = watch("category");

  useEffect(() => {
    console.log(location);
    // get parent categories
    const getParentCategories = async () => {
      try {
        const res = await getCategoriesService();
        if (res.status == 200) {
          setParentCategories(
            res.data.data.map((option) => ({
              value: option.id,
              title: option.title,
            }))
          );
        } else {
          addNotification("error", "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      }
    };
    // get brands
    const getBrands = async () => {
      try {
        const res = await getBrandsService();
        if (res.status == 200) {
          setBrands(
            res.data.data.map((option) => ({
              value: option.id,
              title: option.persian_name,
            }))
          );
        } else {
          addNotification("error", "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      }
    };
    //get colors
    const getColors = async () => {
      try {
        const res = await getColorsService();
        if (res.status == 200) {
          setColor(
            res.data.data.map((option) => ({
              value: option.id,
              label: option.title,
            }))
          );
        } else {
          addNotification("error", "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      }
    };
    //get guarantee
    const getWarranties = async () => {
      try {
        const res = await getWarrantiesService();
        if (res.status == 200) {
          setWarranties(
            res.data.data.map((option) => ({
              value: option.id,
              label: option.title,
            }))
          );
        } else {
          addNotification("error", "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      }
    };

    getParentCategories();
    getBrands();
    getColors();
    getWarranties();
  }, []);

  useEffect(() => {
    if (!selectedPCategory) return;
    const getParentCategories = async () => {
      try {
        setLoadingGetChild(true);
        setChildCategories([]);
        const res = await getCategoriesService(selectedPCategory);
        if (res.status == 200) {
          setChildCategories(
            res.data.data.map((option) => ({
              value: option.id,
              label: option.title,
            }))
          );
        } else {
          addNotification("error", "خطایی رخ داده");
        }
      } catch {
        addNotification("error", "خطایی رخ داده");
      } finally {
        setLoadingGetChild(false);
      }
    };
    getParentCategories();
  }, [selectedPCategory]);

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append("category_ids", values.category_ids.join("-"));
    formData.append("title", values.title);
    formData.append("price", values.price);

    if (values.weight) formData.append("weight", values.weight);

    if (values.brand_id) formData.append("brand_id", values.brand_id);

    if (values.color_ids.length)
      formData.append("color_ids", values.color_ids.join("-"));

    if (values.guarantee_ids.length)
      formData.append("guarantee_ids", values.guarantee_ids.join("-"));

    if (values.descriptions)
      formData.append("descriptions", values.descriptions);

    if (values.short_descriptions)
      formData.append("short_descriptions", values.short_descriptions);

    if (values.cart_descriptions)
      formData.append("cart_descriptions", values.cart_descriptions);

    if (values.image?.length) formData.append("image", values.image[0]);

    if (values.alt_image) formData.append("alt_image", values.alt_image);

    if (values.keywords.length)
      formData.append("keywords", values.keywords.join("-"));

    if (values.stock) formData.append("stock", values.stock);

    if (values.discount) formData.append("discount", values.discount);

    try {
      const res = await addProductService(formData);
      if (res.status == 201) {
        addNotification("success", "محصول با موفقیت ثبت شد");
      } else {
        addNotification("error", "مشکلی پیش آمده");
      }
    } catch {
      addNotification("error", "مشکلی پیش آمده");
    }
  };

  return (
    <>
      <div className="container">
        <div className="modal-header mb-3">
          <h5 className="modal-title flex-fill" id="exampleModalLabel">
            افزودن محصول جدید
          </h5>
          <PrevPageButton />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-center">
            <FormController
              control="select"
              label="دسته اصلی"
              error={errors.category?.message}
              className="col-md-6 col-lg-8"
              options={parentCategories}
              {...register("category", {
                valueAsNumber: true,
              })}
            />
            <FormController
              control={"multiSelect"}
              name="category_ids"
              label="دسته بندی"
              isLoading={loadingGetChild}
              formControl={control}
              options={ChildCategories}
              error={errors.category_ids?.message}
              className="col-md-6 col-lg-8"
            />
            <FormController
              control="input"
              type="text"
              label="عنوان  محصول"
              error={errors.title?.message}
              className="col-md-6 col-lg-8"
              {...register("title")}
              placeholder="عنوان محصول را وارد کنید"
            />
            <FormController
              control="input"
              type="number"
              label="قیمت  محصول"
              error={errors.price?.message}
              className="col-md-6 col-lg-8"
              {...register("price", {
                valueAsNumber: true,
              })}
              placeholder="قیمت به تومان"
            />
            <FormController
              control="input"
              type="number"
              label="وزن  محصول"
              error={errors.weight?.message}
              className="col-md-6 col-lg-8"
              {...register("weight", {
                valueAsNumber: true,
              })}
              placeholder="وزن به کیلوگرم"
            />
            <FormController
              control="select"
              label="برند محصول"
              error={errors.brans_id?.message}
              className="col-md-6 col-lg-8"
              options={brands}
              {...register("brans_id", {
                valueAsNumber: true,
              })}
            />
            <FormController
              control={"multiSelect"}
              name="color_ids"
              label="رنگ"
              formControl={control}
              options={color}
              error={errors.color_ids?.message}
              className="col-md-6 col-lg-8"
            />
            <FormController
              control={"multiSelect"}
              name="guarantee_ids"
              label="گارانتی"
              formControl={control}
              options={warranties}
              error={errors.guarantee_ids?.message}
              className="col-md-6 col-lg-8"
            />
            <FormController
              control="textarea"
              label="توضیحات  محصول"
              error={errors.descriptions?.message}
              className="col-md-6 col-lg-8"
              {...register("descriptions")}
              placeholder="توضیحات محصول را وارد کنید"
            />
            <FormController
              control="textarea"
              label="توضیحات کوتاه محصول"
              error={errors.short_descriptions?.message}
              className="col-md-6 col-lg-8"
              {...register("short_descriptions")}
              placeholder="خلاصه توضیحات محصول را وارد کنید"
            />
            <FormController
              control="textarea"
              label="توضیحات سبدخرید"
              error={errors.cart_descriptions?.message}
              className="col-md-6 col-lg-8"
              {...register("cart_descriptions")}
              placeholder="توضیحاتی که کاربر درهنگام اضاف کردن به سبدخرید مشاهده میکند"
            />
            <FormController
              control="fileField"
              label="تصویر"
              error={errors.image?.message}
              className="col-md-6 col-lg-8"
              {...register("image")}
            />
            <FormController
              control="input"
              type="text"
              label="alt تصویر"
              error={errors.alt_image?.message}
              className="col-md-6 col-lg-8"
              {...register("alt_image")}
              placeholder="عنوان جایگزین تصویر"
            />
            <FormController
              control="tagInput"
              name="keywords"
              formControl={control}
              className="col-md-6 col-lg-8"
              label="کلمات کلیدی سئو"
              error={errors.keywords?.message}
            />
            <FormController
              control="input"
              type="number"
              label="موجودی"
              error={errors.stock?.message}
              className="col-md-6 col-lg-8"
              {...register("stock", {
                valueAsNumber: true,
              })}
              placeholder="موجودی محصول"
            />
            <FormController
              control="input"
              type="number"
              label="درصد تخفیف"
              error={errors.discount?.message}
              className="col-md-6 col-lg-8"
              {...register("discount", {
                valueAsNumber: true,
              })}
              placeholder="میزان تخفیف به درصد"
            />

            <SubmitButton
              isDirty={isDirty}
              isValid={isValid}
              isSubmitting={isSubmitting}
              title="ذخیره"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;

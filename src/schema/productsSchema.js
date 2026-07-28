import { z } from "zod";

export const productsSchema = z.object({
  category: z
    .number({
      required_error: "دسته اصلی را انتخاب کنید",
    })
    .min(1, "دسته اصلی را انتخاب کنید"),

  category_ids: z.array(z.number()).min(1, "حداقل یک دسته بندی انتخاب کنید"),

  title: z
    .string()
    .trim()
    .min(3, "عنوان محصول حداقل باید ۳ کاراکتر باشد")
    .max(100, "عنوان محصول نباید بیشتر از 100 کاراکتر باشد"),

  price: z
    .number({
      required_error: "قیمت محصول الزامی است",
    })
    .min(0, "قیمت نمی‌تواند منفی باشد"),

  weight: z
    .number({
      required_error: "وزن محصول الزامی است",
    })
    .min(0, "وزن نمی‌تواند منفی باشد"),

  brand_id: z
    .number({
      required_error: "برند را انتخاب کنید",
    })
    .min(1, "برند را انتخاب کنید"),

  color_ids: z.array(z.number()).optional().default([]),

  guarantee_ids: z.array(z.number()).optional().default([]),

  descriptions: z.string().trim().optional(),

  short_descriptions: z
    .string()
    .trim()
    .max(300, "توضیحات کوتاه نباید بیشتر از ۳۰۰ کاراکتر باشد"),

  cart_descriptions: z
    .string()
    .trim()
    .max(255, "توضیحات سبد خرید نباید بیشتر از ۲۵۵ کاراکتر باشد")
    .optional()
    .or(z.literal("")),

  image: z
    .any()
    .refine(
      (file) => file instanceof FileList && file.length > 0,
      "تصویر محصول الزامی است"
    ),

  alt_image: z
    .string()
    .trim()
    .min(3, "متن جایگزین تصویر را وارد کنید")
    .max(255),

  keywords: z
    .array(z.string().trim().min(1))
    .max(30, "حداکثر ۳۰ کلمه کلیدی مجاز است"),

  stock: z
    .number({
      required_error: "موجودی محصول الزامی است",
    })
    .min(0),

  discount: z
    .number()
    .min(0, "حداقل تخفیف ۰ درصد است")
    .max(100, "حداکثر تخفیف ۱۰۰ درصد است")
    .optional(),
});

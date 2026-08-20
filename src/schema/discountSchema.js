import { z } from "zod";

export const discountSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "عنوان باید حداقل ۳ کاراکتر باشد.")
      .max(50, "عنوان باید حداکثر ۵۰ کاراکتر باشد."),

    code: z
      .string()
      .trim()
      .regex(
        /^[A-Z0-9]{4,20}$/,
        "کد تخفیف باید فقط شامل حروف انگلیسی بزرگ و اعداد انگلیسی باشد (۴ تا ۲۰ کاراکتر)."
      ),

    percent: z.coerce
      .number()
      .min(0, "درصد تخفیف نمی‌تواند کمتر از ۰ باشد.")
      .max(100, "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد."),

    expire_at: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "تاریخ باید با فرمت YYYY-MM-DD باشد."
      ),

    for_all: z.boolean(),

    product_ids: z.array(z.number()).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.for_all) {
      if (!data.product_ids || data.product_ids.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["product_ids"],
          message: "انتخاب حداقل یک محصول الزامی است.",
        });
      }
    }
  });
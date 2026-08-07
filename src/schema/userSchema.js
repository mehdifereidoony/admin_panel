import { z } from "zod";

const phoneRegex = /^09\d{9}$/;


//base schema
const baseSchema = {
  user_name: z
    .string()
    .trim()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد.")
    .max(50, "نام کاربری حداکثر ۵۰ کاراکتر است."),

  first_name: z
    .string()
    .trim()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد."),

  last_name: z
    .string()
    .trim()
    .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد."),

  phone: z
    .string()
    .regex(phoneRegex, "شماره موبایل معتبر نیست."),

  national_code: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد."),

  email: z
    .string()
    .email("ایمیل معتبر نیست."),

  birth_date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "تاریخ معتبر نیست."
    ),

  gender: z.coerce.number(),

  roles_id: z
    .array(z.number())
    .min(1, "حداقل یک نقش انتخاب کنید."),
};

//create schema
export const userCreateSchema = z.object({
  ...baseSchema,

  password: z
    .string()
    .min(8, "رمز عبور حداقل باید ۸ کاراکتر باشد."),
});

// update schema
export const userEditSchema = z.object({
  ...baseSchema,

  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) =>
        value === "" || value.length >= 8,
      {
        message:
          "رمز عبور باید حداقل ۸ کاراکتر باشد.",
      },
    ),
});
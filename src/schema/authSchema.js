import z from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "این فیلد اجباری هست")
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isUserName = /^[a-zA-Z0-9_]{3,30}$/.test(value);
        return isEmail || isUserName;
      },
      {
        message: "نام کاربری یا ایمیل نامعتبر",
      }
    ),
  password: z.string().min(6, "حداقل 6 کارکتر").max(99, "حداکثر 99 کارکتر"),
});

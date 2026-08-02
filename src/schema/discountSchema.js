import z from "zod";

export const discountSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "حداقل دو کاراکتر")
    .max(50, "حداکثر 50 کاراکتر"),
  code: z
    .string()
    .trim()
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      "کد رنگ باید به فرمت hex باشد"
    ),
  expire_at: z.string(),
});

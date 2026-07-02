import z from "zod";

export const brandsSchema = z.object({
  original_name: z
    .string()
    .trim()
    .min(2, "حداقل دو کاکتر")
    .max(50, "حداکثر 50 کاکتر"),
  persian_name: z
    .string()
    .trim()
    .min(2, "حداقل دو کاکتر")
    .max(50, "حداکثر 50 کاکتر"),
  descriptions: z.string().optional(),
  logo: z
    .any()
    .refine(
      (file) => !file || !file.length || file[0]?.size <= 2 * 1024 * 1024,
      "حجم تصویر نباید بیشتر از 2 مگابایت باشد"
    ),
});

import z from "zod";

export const warrantiesSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "حداقل دو کاراکتر")
    .max(100, "حداکثر 100 کاراکتر"),
  descriptions: z.string().optional(),
  length: z.coerce
    .number({ invalid_type_error: "مقدار اعتبار باید عدد باشد" })
    .min(1, "حداقل 1"),
  length_unit: z.enum(["year", "month", "day"], {
    errorMap: () => ({ message: "واحد اعتبار را انتخاب کنید" }),
  }),
});

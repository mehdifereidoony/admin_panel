import z from "zod";

export const categoriesSchema = z.object({
  title: z.string().trim().min(2, "حداقل دو کاکتر").max(50, "حداکثر 50 کاکتر"),
  parent_id: z.coerce.number().optional(),
  descriptions: z.string().optional(),
  image: z
    .any()
    .refine(
      (file) => !file.length || file[0]?.size <= 2 * 1024 * 1024,
      "حجم تصویر نباید بیشتر از 2 مگابایت باشد"
    ),
  is_active: z.boolean().default(false),
  show_in_menu: z.boolean().default(false),
});

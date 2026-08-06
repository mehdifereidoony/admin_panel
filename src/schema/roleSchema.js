import z from "zod";

export const roleSchema = z.object({
    title: z
          .string()
          .trim()
          .min(3, "عنوان باید حداقل ۳ کاراکتر باشد.")
          .max(50, "عنوان باید حداکثر ۵۰ کاراکتر باشد."),
    description: z
          .string()
          .trim()
          .min(3, "عنوان باید حداقل ۳ کاراکتر باشد.")
          .max(200, "عنوان باید حداکثر 200 کاراکتر باشد."),
    permissions_id: z.array(z.number())
})
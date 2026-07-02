import z from "zod";

export const attributeSchema = z.object({
  title: z.string().trim().min(2, "حداقل دو کاکتر").max(50, "حداکثر 50 کاکتر"),
  unit: z.string().trim().min(2, "حداقل دو کاکتر").max(50, "حداکثر 50 کاکتر"),
  in_filter: z.boolean().default(false),
});

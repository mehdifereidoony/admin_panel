import { format } from "date-fns-jalali";

export const formatDate = (data) => {
  return format(data, "d MMMM yyyy");
};

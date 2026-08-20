import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import {format} from "date-fns-jalali"

export const formatDate = (date) => {
  return format(date, "d MMMM yyyy");
};




export const convertShamsiToGregorian = (shamsiDate) => {
  if (!shamsiDate) return "";

  return new DateObject({
    date: shamsiDate,
    format: "YYYY-MM-DD",
    calendar: persian,
  })
    .convert(gregorian)
    .format("YYYY-MM-DD");
};
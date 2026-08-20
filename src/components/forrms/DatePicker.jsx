import DatePickerPackage from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";

const DatePicker = DatePickerPackage.default;

const CustomDatePicker = ({
  name,
  formControl,
  label,
  error,
  className = "",
  minDate,
  maxDate,
}) => {
  return (
    <>
      <div className={`col-12 mb-3 ${className}`}>
        <div className="input-group" style={{ direction: "ltr" , justifyContent: "flex-end" }}>
          <Controller
            name={name}
            control={formControl}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={field.value}
                inputClass="form-control"
                minDate={minDate}
                maxDate={maxDate}
                onChange={(date) => {


                    const gregorian = date.convert("gregorian");


                    const year = gregorian.year;
                    const month = String(gregorian.month.number).padStart(2, "0");
                    const day = String(gregorian.day).padStart(2, "0");

                    const result = `${year}-${month}-${day}`;


                    field.onChange(result);
                    }}
              />
            )}
          />

          <span className="input-group-text w_6rem justify-content-center">
            {label}
          </span>
        </div>
      </div>

      {error && <small className="text-danger">{error}</small>}
    </>
  );
};

export default CustomDatePicker;

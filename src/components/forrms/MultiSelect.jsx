import Select from "react-select";
import { Controller } from "react-hook-form";

const MultiSelect = ({
  name,
  formControl,
  label,
  options = [],
  error,
  className = "",
  placeholder = "انتخاب کنید...",
  isDisabled = false,
  isLoading = false,
}) => {
  return (
    <div className={`col-12 mb-3 ${className}`}>
      <label className="form-label">{label}</label>

      <Controller
        name={name}
        control={formControl}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            placeholder={placeholder}
            options={options}
            isDisabled={isDisabled}
            isLoading={isLoading}
            noOptionsMessage={() => "موردی یافت نشد"}
            loadingMessage={() => "در حال بارگذاری..."}
            value={options.filter((option) =>
              field.value?.includes(option.value)
            )}
            onChange={(selected) => {
              field.onChange(
                selected ? selected.map((item) => item.value) : []
              );
            }}
          />
        )}
      />

      {error && <small className="text-danger mt-1 d-block">{error}</small>}
    </div>
  );
};

export default MultiSelect;

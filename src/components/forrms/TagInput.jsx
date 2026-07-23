import { useState } from "react";
import { Controller } from "react-hook-form";

const TagInput = ({
  name,
  formControl,
  label,
  error,
  className = "",
  placeholder = "تگ را وارد کنید...",
  isDisabled = false,
  maxTags,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (field) => {
    const value = inputValue.trim();

    if (!value) return;

    if (field.value.includes(value)) {
      setInputValue("");
      return;
    }

    if (maxTags && field.value.length >= maxTags) return;

    field.onChange([...field.value, value]);
    setInputValue("");
  };

  return (
    <div className={`col-12 mb-3 ${className}`}>
      <label className="form-label">{label}</label>

      <Controller
        name={name}
        control={formControl}
        defaultValue={[]}
        render={({ field }) => (
          <>
            <div className="form-control d-flex flex-wrap align-items-center gap-2 py-2">
              {field.value.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-primary d-flex align-items-center"
                >
                  {tag}

                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    style={{ fontSize: "8px" }}
                    onClick={() =>
                      field.onChange(field.value.filter((_, i) => i !== index))
                    }
                  />
                </span>
              ))}

              <input
                type="text"
                value={inputValue}
                disabled={isDisabled}
                placeholder={placeholder}
                className="border-0 flex-grow-1"
                style={{
                  outline: "none",
                  minWidth: "150px",
                  background: "transparent",
                }}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag(field);
                  }

                  if (
                    e.key === "Backspace" &&
                    !inputValue &&
                    field.value.length
                  ) {
                    field.onChange(field.value.slice(0, -1));
                  }
                }}
              />
            </div>
          </>
        )}
      />

      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default TagInput;

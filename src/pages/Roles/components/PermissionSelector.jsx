import Checkbox from "../../../components/forrms/Checkbox";

const PermissionSelector = ({
  permissions = [],
  value = [],
  onChange,
  error,
}) => {
  const handleChange = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="col-12 mb-3">
      <label className="form-label">دسترسی‌ها</label>

      <div className="row border rounded p-3">
        {permissions.map((permission) => (
          <div
            key={permission.id}
            className="col-12 col-md-4 col-lg-3 mb-2 permissions-check"
          >
            <Checkbox
              id={`permission-${permission.id}`}
              label={permission.title}
              checked={value.includes(permission.id)}
              onChange={() => handleChange(permission.id)}
              miniBox={true}
            />
          </div>
        ))}
      </div>

      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default PermissionSelector;

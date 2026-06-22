import Checkbox from "./Checkbox";
import FileField from "./FileField";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

const FormController = ({ control, ...props }) => {
  switch (control) {
    case "input":
      return <Input {...props} />;
    case "select":
      return <Select {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "fileField":
      return <FileField {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    default:
      return <Input {...props} />;
  }
};

export default FormController;

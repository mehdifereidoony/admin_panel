import Checkbox from "./Checkbox";
import FileField from "./FileField";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import Select from "./Select";
import TagInput from "./TagInput";
import Textarea from "./Textarea";

const FormController = ({ control, ...props }) => {
  switch (control) {
    case "input":
      return <Input {...props} />;
    case "select":
      return <Select {...props} />;
    case "multiSelect":
      return <MultiSelect {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "fileField":
      return <FileField {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "tagInput":
      return <TagInput {...props} />;
    case "editor":
      return <RichTextEditor {...props} />;
    default:
      return <Input {...props} />;
  }
};

export default FormController;

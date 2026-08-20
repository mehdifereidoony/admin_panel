import { useLocation } from "react-router";
import PrevPageButton from "../../../components/common/PrevPageButton";

const ChildCategories = () => {
  const location = useLocation();
  return (
    <div className="d-flex justify-content-between align-items-center mb-5">
      <h4 className="text-center">
        دسته والد:
        <span className="text-info">{location.state.parentData.title}</span>
      </h4>
      <PrevPageButton />
    </div>
  );
};

export default ChildCategories;

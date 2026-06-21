import { useNavigate } from "react-router";

const PrevPageButton = () => {
  const navigate = useNavigate();
  return (
    <button className="btn btn-primary" onClick={() => navigate(-1)}>
      بازگشت
    </button>
  );
};
export default PrevPageButton;

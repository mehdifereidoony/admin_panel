const IsActive = ({ data }) => {
  if (data.is_active) return <span>✅</span>;
  else return <span>❌</span>;
};
export default IsActive;

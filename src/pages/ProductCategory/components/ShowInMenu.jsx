const ShowInMenu = ({ data }) => {
  if (data.show_in_menu) return <span className="text-success">بله</span>;
  else return <span className="text-danger">خیر</span>;
};

export default ShowInMenu;

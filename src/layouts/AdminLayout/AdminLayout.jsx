import { Outlet } from "react-router";
import Header from "../../components/layout/Header/Header";
import Sidebar from "../../components/layout/Sidebar/Sidebar";


const AdminLayout = () => {
  return (
    <>
      {/* header (navbar) */}
      <Header />
      {/* sidebar  */}
      <Sidebar />
      {/* main content */}
      <section id="content_section" className="bg-light py-2 px-3">
        <Outlet />
      </section>
    </>
  );
};

export default AdminLayout;

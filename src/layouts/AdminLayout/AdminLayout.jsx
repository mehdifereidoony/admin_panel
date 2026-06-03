import Header from "../../components/layout/Header/Header";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";

const AdminLayout = () => {
  return (
    <>
      {/* header (navbar) */}
      <Header />
      {/* sidebar  */}
      <Sidebar />
      {/* main content */}
      <section id="content_section" className="bg-light py-2 px-3">
        <Dashboard />
      </section>
    </>
  );
};

export default AdminLayout;

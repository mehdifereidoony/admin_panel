import { usePermission } from "../../../hooks/usePermission";
import GroupTitle from "./GroupTitle";
import MenuItem from "./MenuItem";
import UserAvatar from "./UserAvatar";

const Sidebar = () => {
  const { can, hasAny } = usePermission();
  return (
    <section id="sidebar_section">
      <div className="mini_sidebar collapsedd bg-dark h-100">
        <div className="p-0 m-0">
          <UserAvatar name={"mehdi"} imageSrc={"/assets/images/user2.jpg"} />

          <MenuItem to="/" title="داشبورد" icon="fas fa-tachometer-alt" />

          {hasAny([
            "read_categories",
            "read_products",
            "read_brands",
            "read_guarantees",
            "read_discounts",
          ]) && <GroupTitle title="فروشگاه" />}

          {can("read_categories") && (
            <MenuItem
              to="/categories"
              title="مدیریت گروه محصول"
              icon="fas fa-stream"
            />
          )}

          {can("read_products") && (
            <MenuItem to="/products" title="مدیریت محصول" icon="fas fa-cube" />
          )}

          {can("read_brands") && (
            <MenuItem
              to="/brands"
              title="مدیریت برندها"
              icon="fas fa-copyright"
            />
          )}

          {can("read_guarantees") && (
            <MenuItem
              to="/warranties"
              title="مدیریت گارانتی‌ها"
              icon="fab fa-pagelines"
            />
          )}

          {can("read_colors") && (
            <MenuItem
              to="/colors"
              title="مدیریت رنگ‌ها"
              icon="fas fa-palette"
            />
          )}

          {can("read_discounts") && (
            <MenuItem
              to="/discounts"
              title="مدیریت تخفیف ها"
              icon="fas fa-percentage"
            />
          )}

          <GroupTitle title="سفارشات و سبد" />

          <MenuItem title="مدیریت سبدها" icon="fas fa-shopping-basket" />
          <MenuItem title="مدیریت سفارشات" icon="fas fa-luggage-cart" />
          <MenuItem title="مدیریت نحوه ارسال" icon="fas fa-truck-loading" />

          <GroupTitle title="کاربران و همکاران" />

          {can("read_users") && (
            <MenuItem to="/user" title="مشاهده کاربران" icon="fas fa-users" />
          )}

          {can("read_roles") && (
            <MenuItem to="/roles" title="نقش ها" icon="fas fa-user-tag" />
          )}

          {can("read_permissions") && (
            <MenuItem
              to="/permissions"
              title="مجوز ها"
              icon="fas fa-shield-alt"
            />
          )}

          <GroupTitle title="ارتباطات" />

          <MenuItem title="سوال ها" icon="fas fa-question-circle" />
          <MenuItem title="نظرات" icon="fas fa-comment" />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;

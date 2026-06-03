import GroupTitle from "./GroupTitle";
import MenuItem from "./MenuItem";
import UserAvatar from "./UserAvatar";

const Sidebar = () => {
  return (
    <section id="sidebar_section">
      <div className="mini_sidebar collapsedd bg-dark h-100">
        <ul className="p-0 m-0">
          <UserAvatar name={"mehdi"} imageSrc={"/assets/images/user2.jpg"} />

          <MenuItem title="داشبرد" icon="fas fa-tachometer-alt" />

          <GroupTitle title="فروشگاه" />
          <MenuItem title="مدیریت گروه محصول" icon="fas fa-stream" />
          <MenuItem title="مدیریت محصول" icon="fas fa-cube" />
          <MenuItem title="مدیریت برندها" icon="fas fa-copyright" />
          <MenuItem title="مدیریت گرانتی ها" icon="fab fa-pagelines" />
          <MenuItem title="مدیریت رنگ ها" icon="fas fa-palette" />
          <MenuItem title="مدیریت تخفیف ها" icon="fas fa-percentage" />

          <GroupTitle title="سفارشات و سبد" />
          <MenuItem title="مدیریت سبدها" icon="fas fa-shopping-basket" />
          <MenuItem title="مدیریت سفارشات" icon="fas fa-luggage-cart" />
          <MenuItem title="مدیریت نحوه ارسال" icon="fas fa-truck-loading" />

          <GroupTitle title="کاربران و همکاران" />
          <MenuItem title="مشاهده کاربران" icon="fas fa-users" />
          <MenuItem title="نقش ها" icon="fas fa-user-tag" />
          <MenuItem title="مجوز ها" icon="fas fa-shield-alt" />

          <GroupTitle title="ارتباطات" />
          <MenuItem title="سوال ها" icon="fas fa-question-circle" />
          <MenuItem title="نظرات" icon="fas fa-comment" />
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;

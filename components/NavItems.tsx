import { Link } from "react-router";
import { sidebarItems } from "~/constants";

const NavItems = () => {
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img
          src="../public/assets/images/logo.png"
          alt="logo"
          className="size-[30px]"
        />
        <h1>Grand Sekai</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({ id, href, icon, label }) => (
            <div>{label}</div>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default NavItems;

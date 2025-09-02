import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, NavItems } from "components";
import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router";
import { logoutUser, storeUserData } from "~/appwrite/authentication";
import { account } from "~/appwrite/client";
import { getExistingUser } from "~/appwrite/collect";

export async function clientLoader() {
  try {
    const user = await account.get();
    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : "";
  } catch (e) {
    console.error("Did not find user", e);
  }
}

const pageLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("sign-in");
  };

  const user = useLoaderData();

  return (
    <div className="page-layout">
      <section className="page-items">
        <Link to="/" className="link-logo">
          <img
            src="
        /assets/images/logo.png"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Grand Sekai</h1>
        </Link>
        <footer className="page-footer">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}>
            Admin Panel
          </button>
          <img
            src={user?.imageUrl || "assets/images/headshot.jpg"}
            alt={user?.name || "Chantakrak"}
            referrerPolicy="no-referrer"
          />
          <button onClick={handleLogout} className="cursor-pointer">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6"
            />
          </button>
        </footer>
      </section>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default pageLayout;

import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavItems, MobileSidebar } from "../../../components";
import { account } from "~/appwrite/client";
import { storeUserData } from "~/appwrite/authentication";
import { getExistingUser } from "~/appwrite/collect";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") {
      return redirect("/users");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.error("Error in client loader", e);
    return redirect("sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;

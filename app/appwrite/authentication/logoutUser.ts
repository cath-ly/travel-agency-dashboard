import { account } from "~/appwrite/client";

export const logoutUser = async () => {
    try {
        await account.deleteSession("current");
    } catch(e) {
        console.error("logoutUser:", e);
    }
}

export default logoutUser;
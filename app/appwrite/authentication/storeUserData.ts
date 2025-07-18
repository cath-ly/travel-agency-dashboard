import { account, appwriteConfig, database } from "~/appwrite/client";
import { ID } from "appwrite";
import getGooglePicture from "../collect/getGooglePicture";
import { redirect } from "react-router";

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) {
      throw new Error("Failed to get user");
    }

    const { providerAccessToken } = (await account.getSession("current")) || {};
    const profilePicture = providerAccessToken
      ? await getGooglePicture(providerAccessToken)
      : null;

    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: profilePicture || "",
        joinedAt: new Date().toISOString(),
      }
    );

    if (!createdUser) {
      redirect("/sign-in");
    }
  } catch (e) {
    console.error("storeUserData:", e);
    return null;
  }
};

export default storeUserData;

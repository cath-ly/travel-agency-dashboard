import { account, appwriteConfig, database } from "~/appwrite/client";
import { Query } from "appwrite";
import { redirect } from "react-router";

export const getUser = async () => {
    try {
        const user = await account.get();

        if (!user){
            return redirect("/sign-in");
        }

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.equal("accountId", user.$id),
                Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"])
            ]
        );
        if (documents.length === 0){
            return redirect("/sign-in");
        }
        return documents[0];
    } catch(e) {
        console.error("getUser:", e);
        return null;
    }
}

export default getUser;
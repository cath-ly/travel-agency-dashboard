import { appwriteConfig, database } from "~/appwrite/client";
import { Query } from "appwrite";

export const getExistingUser = async (id: string) => {
    try {
        const { documents, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [ Query.equal("accountId", id)]
        );
        if (total === 0){
            return null;
        }
        return documents[0];
    } catch(e) {
        console.error("getExistingUser:", e);
        return null;
    }
}

export default getExistingUser;
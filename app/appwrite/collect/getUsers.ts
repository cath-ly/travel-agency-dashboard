import { Query } from "appwrite";
import { appwriteConfig, database } from "../client";

export const getUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );
    if (total === 0) {
      return { users: [], total };
    }
    return { users, total };
  } catch (e) {
    console.error("Error fetching all users", e);
    return { users: [], total: 0 };
  }
};

export default getUsers;

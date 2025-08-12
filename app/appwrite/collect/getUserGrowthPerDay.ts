import type { Document } from "~/lib/schema/document";
import { appwriteConfig, database } from "../client";

export const getUserGrowthPerDay = async () => {
  const users = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId
  );

  const userGrowth = users.documents.reduce(
    (acc: { [key: string]: number }, user: Document) => {
      const date = new Date(user.joinedAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(userGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export default getUserGrowthPerDay;

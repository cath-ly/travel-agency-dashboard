import { appwriteConfig, database } from "../client";
import type { Document } from "~/lib/schema/document";

const getCreatedTripsPerDay = async () => {
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripsCollectionId
  );

  const tripsGrowth = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const date = new Date(trip.createdAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(tripsGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export default getCreatedTripsPerDay;

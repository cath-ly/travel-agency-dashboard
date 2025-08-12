import type { Document } from "~/lib/schema/document";
import { appwriteConfig, database } from "../client";
import { parseTripData } from "~/lib/utils";

export const getTripsByTravelStyle = async () => {
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripsCollectionId
  );

  const travelStyleCounts = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const tripDetail = parseTripData(trip.tripDetails);

      if (tripDetail && tripDetail.travelStyle) {
        const travelStyle = tripDetail.travelStyle;
        acc[travelStyle] = (acc[travelStyle] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
    count: Number(count),
    travelStyle,
  }));
};

export default getTripsByTravelStyle;

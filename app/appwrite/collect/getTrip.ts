import { appwriteConfig, database } from "../client";

export const getTripByID = async (tripID: string) => {
  const trip = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.tripsCollectionId,
    tripID
  );

  if (!trip.$id) {
    console.error("Trip could not be found");
    return null;
  }

  return trip;
};

export default getTripByID;

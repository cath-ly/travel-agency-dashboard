import { filterByDate, filterUsersByRole } from "~/lib/utils";
import { appwriteConfig, database } from "../client";

export const getUserTripStats = async (): Promise<DashboardStats> => {
  const d = new Date();
  const currentMonth = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  const startLastMonth = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString();
  const endLastMonth = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

  const [users, trips] = await Promise.all([
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId
    ),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tripsCollectionId
    ),
  ]);

  return {
    totalUsers: users.total,
    monthlyUsers: {
      currentMonth: filterByDate(
        users.documents,
        "joinedAt",
        currentMonth,
        undefined
      ),
      lastMonth: filterByDate(
        users.documents,
        "joinedAt",
        startLastMonth,
        endLastMonth
      ),
    },
    activeUser: {
      total: filterUsersByRole(users, "user").length,
      currentMonth: filterByDate(
        filterUsersByRole(users, "user"),
        "joinedAt",
        currentMonth,
        undefined
      ),
      lastMonth: filterByDate(
        filterUsersByRole(users, "user"),
        "joinedAt",
        startLastMonth,
        endLastMonth
      ),
    },
    totalTrips: trips.total,
    monthlyTrips: {
      currentMonth: filterByDate(
        trips.documents,
        "createdAt",
        currentMonth,
        undefined
      ),
      lastMonth: filterByDate(
        trips.documents,
        "createdAt",
        startLastMonth,
        endLastMonth
      ),
    },
  };
};

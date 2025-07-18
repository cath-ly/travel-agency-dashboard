import { Header, StatCard, TripCard } from "components";
import { getUser } from "~/appwrite/collect";
import { allTrips, dashboardStat, user } from "~/constants";
import type { Route } from "./+types/dashboard";

export const clientLoader = async () => await getUser();

const { totalUsers, monthlyUsers, totalTrips, monthlyTrips, activeUsers } =
  dashboardStat;

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User | null;
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description="Track current activities, trends, and popular destinations"
      />
      Dashboard Page Content
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md: grid-cols-3 gap-6 w-full">
          <StatCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthTotal={monthlyUsers.currentMonth}
            lastMonthTotal={monthlyUsers.lastMonth}
          />
          <StatCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthTotal={monthlyTrips.currentMonth}
            lastMonthTotal={monthlyTrips.lastMonth}
          />
          <StatCard
            headerTitle="Active Users"
            total={activeUsers.total}
            currentMonthTotal={activeUsers.currentMonth}
            lastMonthTotal={activeUsers.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold">Created Trips</h1>
        <div className="trip-grid">
          {allTrips
            .slice(0, 4)
            .map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (
              <TripCard
                key={id}
                id={id.toString()}
                name={name}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location ?? ""}
                tags={tags}
                price={estimatedPrice}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

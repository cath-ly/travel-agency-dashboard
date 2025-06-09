import { Header, StatCard, TripCard } from "components";

const Dashboard = () => {
  const user = { name: "Chantakrak" };
  const dashboardStat = {
    totalUsers: 10,
    monthlyUsers: { currentMonth: 8, lastMonth: 2},
    totalTrips: 9,
    monthlyTrips: { currentMonth: 5, lastMonth: 4},
    activeUsers: { total: 9, currentMonth: 4, lastMonth: 2},
  }
  const {totalUsers, monthlyUsers, totalTrips, monthlyTrips, activeUsers } = dashboardStat;

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
      <TripCard />
    </main>
  );
};

export default Dashboard;

import { Header, StatCard, TripCard } from "components";
import {
  getAllTrips,
  getTripsByTravelStyle,
  getUser,
  getUserGrowthPerDay,
  getUserTripStat,
  getUsers,
} from "~/appwrite/collect";
import type { Route } from "./+types/dashboard";
import { parseTripData } from "~/lib/utils";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { tripXAxis, tripYAxis, userXAxis, userYAxis } from "~/constants";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";

export const clientLoader = async () => {
  const [user, dashboardStat, trips, userGrowth, tripsByTravelStyle, allUsers] =
    await Promise.all([
      await getUser(),
      await getUserTripStat(),
      await getAllTrips(4, 0),
      await getTripsByTravelStyle(),
      await getUserGrowthPerDay(),
      await getUsers(4, 0),
    ]);

  const allTrips = trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetail),
    imageUrls: imageUrls ?? [],
  }));

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? -1,
  }));

  return {
    user,
    dashboardStat,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
  };
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;
  const allTrips = loaderData.allTrips as Trip[] | [];
  const { totalUsers, monthlyUsers, totalTrips, monthlyTrips, activeUsers } =
    loaderData.dashboardStat;
  const { userGrowth, tripsByTravelStyle, allUsers } = loaderData;

  const trips = allTrips.map((trip) => ({
    imageUrl: trip.imageUrls[0],
    name: trip.name,
    interest: trip.interests,
  }));

  const userTrips = [
    {
      title: "Latest User Sign Ups",
      dataSource: allUsers,
      field: "count",
      headerText: "Trips Created",
    },
    {
      title: "Trips Based on Interests",
      dataSource: allTrips,
      field: "interest",
      headerText: "Interests",
    },
  ];

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
          {allTrips.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                id={id}
                key={id}
                name={name}
                location={itinerary?.[0].location}
                imageUrl={imageUrls[0]}
                tags={[interests, travelStyle]}
                price={estimatedPrice!}
              />
            )
          )}
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartComponent
          id="chart-1"
          primaryXAxis={userXAxis}
          primaryYAxis={userYAxis}
          title="User Growth"
          tooltip={{ enable: true }}>
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="Column"
              name="Column"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="SplineArea"
              name="Wave"
              fill="rgba(71, 132, 238, 0.3)"
              border={{ width: 2, color: "#4784EE" }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
        <ChartComponent
          id="chart-2"
          primaryXAxis={tripXAxis}
          primaryYAxis={tripYAxis}
          title="Trip Trend"
          tooltip={{ enable: true }}>
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={tripsByTravelStyle}
              xName="travelStyle"
              yName="count"
              type="Column"
              name="day"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>
      <section className="user-trip wrapper">
        {userTrips.map(({ title, dataSource, field, headerText }, i) => (
          <div key={i} className="flex flex-col gap-5">
            <h3 className="p-20-semibold text-dark-100">{title}</h3>
            <GridComponent dataSource={dataSource} gridLines="None">
              <ColumnsDirective>
                <ColumnDirective
                  field="name"
                  headerText="Name"
                  width="200"
                  textAlign="Left"
                  template={(props: UserData) => (
                    <div className="flex items-center gap-1.5 px-4">
                      <img
                        src={props.imageUrl}
                        alt="user"
                        className="rounded-full size-8 aspect-square"
                        referrerPolicy="no-referrer"
                      />
                      <span>{props.name}</span>
                    </div>
                  )}
                />
                <ColumnDirective
                  field={field}
                  headerText={headerText}
                  width="150"
                  textAlign="Left"
                />
              </ColumnsDirective>
            </GridComponent>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;

import type { LoaderFunctionArgs } from "react-router";
import getTripByID from "~/appwrite/collect/getTrip";
import type { Route } from "./+types/tripDetail";
import { parseTripData } from "~/lib/utils/utils";
import { Header } from "components";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripID } = params;
  if (!tripID) throw new Error("Trip ID is required!");

  return await getTripByID(tripID);
};

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
  const tripData = parseTripData(loaderData?.tripDetail);
  const { name } = tripData || {};

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />
      <section className="container wrapper-md">
        <h1 className="p-40-semibold text-dark-100">{name}</h1>
      </section>
    </main>
  );
};

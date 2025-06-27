import { Header } from "components";

const Trips = () => {
  return (
    <main className="users wrapper">
      <Header
        title="Trips"
        description="View AI Generated Trips and Edit Plans"
        ctaTitle="Create a Trip"
        ctaURL="/trips/create"
      />
    </main>
  );
};

export default Trips;

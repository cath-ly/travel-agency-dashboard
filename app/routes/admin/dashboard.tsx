import { Header } from "components";

const Dashboard = () => {
  const user = { name: "Chantakrak" };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description="Track current activities, trends, and popular destinations"
      />
      Dashboard Page Content
    </main>
  );
};

export default Dashboard;

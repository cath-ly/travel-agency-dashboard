import { useNavigate } from "react-router";
import { account } from "~/appwrite/client";

const travelPage = () => {
  const navigate = useNavigate();
  return (
    <main className="travel-main">
      <section className="size-full glassmorphism px-8">
        <h1>Plan Your Trip With Ease</h1>
        <h3>gibberish...</h3>
        <button
          onClick={async () => {
            try {
              const user = await account.get();
              if (user.$id) {
                navigate("/users");
              }
            } catch {
              navigate("/sign-in");
            }
          }}>
          Get Started
        </button>
      </section>
    </main>
  );
};

export default travelPage;

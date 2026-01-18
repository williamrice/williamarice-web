import { getServerSession } from "next-auth";
import FuelTransactionListDisplay from "./components/FuelTransactionListDisplay";
import FuelAppNoAccountPage from "./components/FuelAppNoAccountPage";

const FuelTrackerPage = async () => {
  const session = await getServerSession();

  return (
    <div className="flex justify-center mx-auto max-w-7xl">
      {session?.user?.email ? (
        <FuelTransactionListDisplay />
      ) : (
        <FuelAppNoAccountPage />
      )}
    </div>
  );
};

export default FuelTrackerPage;

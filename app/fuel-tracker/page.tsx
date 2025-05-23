import { getServerSession } from "next-auth";
import FuelTransactionListDisplay from "./components/FuelTransactionListDisplay";

import { PrismaClient } from "@prisma/client";
import FuelAppNoAccountPage from "./components/FuelAppNoAccountPage";
const prisma = new PrismaClient();

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

import { getServerSession } from "next-auth";
import FuelTransactionListDisplay from "./components/FuelTransactionListDisplay";

import { PrismaClient } from "@prisma/client";
import { FuelTransactionAddForm } from "./components/FuelTransactionAddForm";
const prisma = new PrismaClient();

export const FuelTracker = async () => {
  const user = await getServerSession();

  if (!user) {
    return <div>You must be logged in to use this feature</div>;
  }

  console.log(user);
  async function getFuelTransactions() {
    "use server";

    const fuelTransactions = await prisma.user.findUnique({
      where: {
        email: user?.user?.email as string,
      },
      include: {
        fuelTransactions: true,
      },
    });
    return fuelTransactions;
  }
  const fuelTransactions = await getFuelTransactions();
  console.log(fuelTransactions);
  return (
    <div className="flex justify-center mx-10">
      {fuelTransactions?.fuelTransactions.length === 0 && (
        <div>No fuel transactions found</div>
      )}

      <FuelTransactionListDisplay />
    </div>
  );
};

export default FuelTracker;

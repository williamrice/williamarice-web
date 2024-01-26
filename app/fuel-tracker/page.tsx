import { getServerSession } from "next-auth";
import FuelTransactionListDisplay from "./components/FuelTransactionListDisplay";

import { PrismaClient } from "@prisma/client";
import { FuelTransactionAddForm } from "./components/FuelTransactionAddForm";
const prisma = new PrismaClient();

export const FuelTrackerPage = () => {
  return (
    <div className="flex justify-center mx-10">
      <FuelTransactionListDisplay />
    </div>
  );
};

export default FuelTrackerPage;

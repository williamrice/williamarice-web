import React from "react";
import CreateBetPopover from "./CreateBetPopover";
import { BetTable } from "./BetTable";
import { BetTableColumns } from "./BetTableColumns";
import { getBets } from "./BetActions";
import { getServerSession } from "next-auth";

async function BetAppDisplay() {
  const session = await getServerSession();
  const bets = await getBets(session?.user?.email);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center border-2 p-4 space-y-2 rounded-md">
        <h1 className="text-3xl text-center py-4">Bet Tracker App</h1>
        <CreateBetPopover />
        <BetTable columns={BetTableColumns} data={bets} />
      </div>
    </>
  );
}

export default BetAppDisplay;

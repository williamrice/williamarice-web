import { getServerSession } from "next-auth";
import React from "react";
import BetAppDisplay from "./BetAppDisplay";

async function BetTrackerPage() {
  const session = await getServerSession();
  return (
    <div className="flex justify-center mx-auto max-w-7xl">
      {session?.user?.email ? (
        <BetAppDisplay />
      ) : (
        <div>
          <h1> You gotta be logged in to see this</h1>
        </div>
      )}
    </div>
  );
}

export default BetTrackerPage;

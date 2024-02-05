import React from "react";
import FuelAppImageCarousel from "./FuelAppImageCarousel";
import { Separator } from "@/components/ui/separator";

const FuelAppInfoComponent = () => {
  return (
    <div className="w-full text-center">
      <Separator className="my-4" />
      <div className="border-2 py-6 my-6 rounded-md">
        <h1 className="text-3xl py-4">
          Curious to what the{" "}
          <span className="font-bold">Fuel Tracker App</span> is?
        </h1>
        <p className="p-2">
          The fuel tracker app is an application that I created to help me keep
          up with my fuel usage at work. We are alloted 180 gallons of fuel per
          month. There is no way to tell how much fuel I have left, so I created
          this app so I can budget my fuel usage each month. Check out the
          images below to learn more...
        </p>
      </div>
      <div className="w-full flex justify-center border-2 p-4 rounded-md">
        <FuelAppImageCarousel />
      </div>
    </div>
  );
};

export default FuelAppInfoComponent;

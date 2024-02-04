import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Signin from "@/components/auth-helpers/Signin";
import FuelAppInfoComponent from "./FuelAppInfoComponent";

const FuelAppNoAccountPage = () => {
  return (
    <div className="w-fit m-2">
      <div>
        <Card>
          <CardHeader className="flex w-full justify-center text-center gap-2">
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>
              You must be signed in with a Google account to use this app!
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex justify-center">
            <Signin />
          </CardContent>
        </Card>
      </div>
      <FuelAppInfoComponent />
    </div>
  );
};

export default FuelAppNoAccountPage;

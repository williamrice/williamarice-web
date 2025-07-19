import { UserSettingsForm } from "@/components/user-settings/UserSettingsForm";
import React from "react";

const AccountSettingsPage = () => {
  return (
    <div className="flex-col items-center justify-center container mx-auto!">
      <h1 className="text-3xl text-center py-6 font-bold">Account Settings</h1>
      <UserSettingsForm />
    </div>
  );
};

export default AccountSettingsPage;

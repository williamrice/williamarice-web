"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CreateBetForm } from "./CreateBetForm";

function CreateBetPopover() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="max-w-sm">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Create Bet</Button>
          </PopoverTrigger>
          <PopoverContent>
            <CreateBetForm setOpen={setOpen} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default CreateBetPopover;

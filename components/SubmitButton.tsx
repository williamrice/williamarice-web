import React from "react";
import { PulseLoader } from "react-spinners";

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => {
  return (
    <button className="px-6 rounded-md py-2 min-w-[100px] bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 transition-all ease-in-out hover:text-white">
      {loading ? <PulseLoader color="white" size={10} /> : "Submit"}
    </button>
  );
};

export default SubmitButton;

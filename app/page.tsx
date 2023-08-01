import JumboTron from "@/app/components/JumboTron";
import Image from "next/image";

export default function Home()
{
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div>
        <JumboTron />
      </div>
    </div>
  );
}

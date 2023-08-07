"use client";

import React from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { Merriweather } from "next/font/google";
import Signin from "./auth-helpers/Signin";
import { signOut, useSession } from "next-auth/react";
import UserNavBarImageMenu from "./profile/UserNavBarImageMenu";

const merriweather = Merriweather({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  display: "swap",
});

interface NavBarProps
{
  fixed?: boolean;
}

export default function Navbar({ fixed }: NavBarProps)
{
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { data: session, status } = useSession();
  return (
    <>
      <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={`${merriweather.className} text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white`}
              href="/"
            >
              William Rice
            </a>
            <div className="flex gap-1">
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <AiOutlineMenu size={25} />
              </button>
              <div className="lg:hidden">{session ? (<UserNavBarImageMenu />) : (<Signin />)}</div>
            </div>

          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  <span className={`${merriweather.className} ml-2`}>
                    About
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/contact"
                >
                  <span className={`${merriweather.className} ml-2`}>
                    Contact
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="https://williamrice.github.io"
                  target="blank"
                >
                  <span className={`${merriweather.className} ml-2`}>
                    Resume
                  </span>
                </a>
              </li>
            </ul>
            <div className="lg:visible xs:invisible">{session ? (<UserNavBarImageMenu />) : (<Signin />)}</div>

          </div>

        </div>

      </div>

    </>
  );
}

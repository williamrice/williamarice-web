"use client";

import React, { useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { AiOutlineMenu } from "react-icons/ai";
import { Merriweather } from "next/font/google";
import Signin from "./auth-helpers/Signin";
import { signOut, useSession } from "next-auth/react";
import UserNavBarImageMenu from "./profile/UserNavBarImageMenu";
import Link from "next/link";

import { HiCake } from "react-icons/hi";
import { cn } from "@/lib/utils";

const merriweather = Merriweather({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
  display: "swap",
});

interface NavBarProps {
  fixed?: boolean;
}

export default function Navbar({ fixed }: NavBarProps) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { data: session, status } = useSession();

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Fuel Tracker",
      href: "/fuel-tracker",
      description: "Fuel tracker for my work",
    },
  ];
  return (
    <>
      <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={`${merriweather.className} flex justify-center items-center text-sm font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase text-white`}
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
              <div className="lg:hidden">
                {session ? <UserNavBarImageMenu /> : <Signin />}
              </div>
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center justify-center lg:justify-end" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <NavigationMenu className="flex flex-row gap-2 list-none">
              <NavigationMenuItem></NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resume" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Resume
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
                  <NavigationMenuContent className="">
                    <ul className="flex flex-col justify-end w-[200px] gap-3 p-4">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/about"
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
            </ul> */}
            <div className="hidden lg:block">
              {session ? <UserNavBarImageMenu /> : <Signin />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

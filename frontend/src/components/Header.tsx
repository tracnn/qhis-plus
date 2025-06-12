"use client";

import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={toggleSidebar}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white"></span>
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white"></span>
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white"></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* User Profile */}
            <li>
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-meta-4"
                href="/profile"
              >
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black dark:text-white">
                    User Name
                  </span>
                  <span className="block text-xs">Admin</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header; 
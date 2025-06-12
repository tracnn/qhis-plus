"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { sidebarOpen } = useSidebar();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.58142 6.38447 6.80642 6.10322 6.80642H2.53135C2.2501 6.80642 2.0251 6.58142 2.0251 6.30005V2.72817C2.0251 2.4468 2.2501 2.2218 2.53135 2.2218H6.10322C6.38447 2.2218 6.60947 2.4468 6.60947 2.72817V6.30005Z"
            fill=""
          />
          <path
            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.58142 15.7502 6.80642 15.4689 6.80642H11.8971C11.6158 6.80642 11.3908 6.58142 11.3908 6.30005V2.72817C11.3908 2.4468 11.6158 2.2218 11.8971 2.2218H15.4689C15.7502 2.2218 15.9752 2.4468 15.9752 2.72817V6.30005Z"
            fill=""
          />
          <path
            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5533 6.38447 15.7783 6.10322 15.7783H2.53135C2.2501 15.7783 2.0251 15.5533 2.0251 15.272V11.7001C2.0251 11.4187 2.2501 11.1937 2.53135 11.1937H6.10322C6.38447 11.1937 6.60947 11.4187 6.60947 11.7001V15.272Z"
            fill=""
          />
          <path
            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5533 15.7502 15.7783 15.4689 15.7783H11.8971C11.6158 15.7783 11.3908 15.5533 11.3908 15.272V11.7001C11.3908 11.4187 11.6158 11.1937 11.8971 11.1937H15.4689C15.7502 11.1937 15.9752 11.4187 15.9752 11.7001V15.272Z"
            fill=""
          />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between bg-blue-100 gap-2 px-6 py-4 lg:py-5">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-800">Your Logo</h1>
        </Link>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname === item.path
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 
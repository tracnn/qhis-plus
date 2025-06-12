import Image from "next/image";
import React from "react";

export default function InvoiceSidebar() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] xl:w-1/5">
      <div className="relative w-full mb-5">
        <form>
          <button className="absolute -translate-y-1/2 left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                fill=""
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Search Invoice..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </form>
      </div>

      <div className="space-y-1">
        <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-100 p-2 hover:bg-gray-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.03]">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image
              width={48}
              height={48}
              src="/images/user/user-19.jpg"
              alt="user"
            />
          </div>

          <div>
            <span className="mb-0.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Zain Geidt
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              ID: #348
            </span>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/[0.03]">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image
              width={48}
              height={48}
              src="/images/user/user-17.jpg"
              alt="user"
            />
          </div>

          <div>
            <span className="mb-0.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Carla George
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              ID: #982
            </span>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/[0.03]">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image
              width={48}
              height={48}
              src="/images/user/user-20.jpg"
              alt="user"
            />
          </div>

          <div>
            <span className="mb-0.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Abram Schleifer
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              ID: #289
            </span>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/[0.03]">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image
              width={48}
              height={48}
              src="/images/user/user-34.jpg"
              alt="user"
            />
          </div>

          <div>
            <span className="mb-0.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Lincoln Donin
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              ID: #522
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

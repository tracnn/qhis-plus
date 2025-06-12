import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AccountMenuDropdown from "@/components/example/DropdownExample/AccountMenuDropdown";
import DropdownWithDivider from "@/components/example/DropdownExample/DropdownWithDivider";
import DropdownWithIcon from "@/components/example/DropdownExample/DropdownWithIcon";
import DropdownWithIconAndDivider from "@/components/example/DropdownExample/DropdownWithIconAndDivider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Dropdowns | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Dropdowns page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Dropdowns() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Dropdowns" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <ComponentCard title="Default Dropdown">
          <div className="pb-[300px]">
            <AccountMenuDropdown />
          </div>
        </ComponentCard>{" "}
        <ComponentCard title="Dropdown With Divider">
          <div className="pb-[300px]">
            <DropdownWithDivider />
          </div>
        </ComponentCard>{" "}
        <ComponentCard title="Dropdown With Icon">
          <div className="pb-[300px]">
            <DropdownWithIcon />
          </div>
        </ComponentCard>{" "}
        <ComponentCard title="Dropdown With Icon and Divider">
          <div className="pb-[300px]">
            <DropdownWithIconAndDivider />
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

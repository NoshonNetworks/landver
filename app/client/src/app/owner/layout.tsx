import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const InspectorDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex">
      <Sidebar role="owner" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default InspectorDashboardLayout;

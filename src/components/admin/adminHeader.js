import React from "react";
import LogoutButton from "../logoutBtn";

const AdminHeader = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Admin Panel</p>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <LogoutButton />
    </div>
  );
};

export default AdminHeader;

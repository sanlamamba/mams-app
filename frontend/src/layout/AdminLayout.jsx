import React from "react";
import AdminNav from "../components/Navbars/AdminNav";

export default function AdminLayout({ children }) {
  return (
    <div className="container-fluid p-4" id="admin-content">
      <AdminNav />
      <div className="content_container admin__container">{children}</div>
    </div>
  );
}

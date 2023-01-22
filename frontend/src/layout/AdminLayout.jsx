import React from "react";
import AdminNav from "../components/Navbars/AdminNav";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageExists = localStorage.getItem("token");
  useEffect(() => {
    if (localStorageExists != null) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: "LOAD_LOGIN_DATA",
        payload: {
          token: localStorageExists,
          ...user,
        },
      });
    }
  }, []);
  return (
    <div className="container-fluid p-4" id="admin-content">
      <AdminNav />
      <div className="content_container admin__container">{children}</div>
    </div>
  );
}

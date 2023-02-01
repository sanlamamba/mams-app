import React from "react";
import AdminNav from "../components/Navbars/AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBtn from "../components/general/NavBtn";

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageExists = localStorage.getItem("token");

  const token = useSelector((state) => state.auth.token) || false;

  useEffect(() => {
    if (!token) {
      navigate("/admin", { replace: true });
    }
  }, [token]);
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
      <NavBtn path={"/"} text="Retourner au site" />
      <AdminNav />
      <div className="content_container admin__container">{children}</div>
    </div>
  );
}

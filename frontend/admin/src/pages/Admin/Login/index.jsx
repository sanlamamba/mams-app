import React, { useEffect } from "react";
import LoginForm from "../../../components/Forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBtn from "../../../components/general/NavBtn";

export default function Index() {
  const token = useSelector((state) => state.auth.token) || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localStorageExists = localStorage.getItem("token");
  console.log(localStorageExists);

  useEffect(() => {
    if (localStorageExists != null) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      dispatch({
        type: "LOAD_LOGIN_DATA",
        payload: {
          token: localStorageExists,
          ...user,
        },
      });
    }
    if (token) {
      navigate("/admin/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="container d-flex justify-content-center align-items-center login__container">
      <NavBtn path={"/"} text={"Retourner au site"} />
      <div className="col-md-5 col-12">
        <LoginForm />
      </div>
    </div>
  );
}

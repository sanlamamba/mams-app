import React, { useEffect } from "react";
import LoginForm from "../../../components/Forms/LoginForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // check if localStorage user exists
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
    if (token.length > 0) {
      navigate("/admin/profile");
    }
  }, [token]);
  return (
    <div className="container d-flex justify-content-center align-items-center login__container">
      <div className="col-md-5 col-12">
        <LoginForm />
      </div>
    </div>
  );
}

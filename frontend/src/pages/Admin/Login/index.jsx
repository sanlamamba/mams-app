import React, { useEffect } from "react";
import LoginForm from "../../../components/Forms/LoginForm";
import { useState } from "react";

export default function Index() {
  return (
    <div className="container d-flex justify-content-center align-items-center login__container">
      <div className="col-md-5 col-12">
        <LoginForm />
      </div>
    </div>
  );
}

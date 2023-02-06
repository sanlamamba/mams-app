import React, { useState } from "react";
import client from "../../apiConfig/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const loginError = useSelector((state) => state.auth.loginError);

  console.log(loginError);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiCall = await client.post("/auth/login", values);

      if (apiCall.ok) {
        const data = apiCall.data.data;
        const token = apiCall.data.token;
        const user = {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          token,
        };
        dispatch({
          type: "LOGIN_REQUEST",
          payload: {
            user,
            token,
          },
        });
      } else {
        console.log(apiCall);
        toast.error(apiCall.data.message);
      }
    } catch (err) {
      toast.error(err);
    }

    // emptyForm();
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="row login__form_container">
      <div className="form-group d-flex justify-content-center flex-column align-items-center">
        <img src="/assets/images/logo.png" alt="" srcset="" width={100} />
        <hr className="login__form_hr " />
      </div>
      <div class="form-group">
        <label for="input-mail">Email</label>
        <input
          type="email"
          class="form-control form-control-sm"
          id="input-mail"
          aria-describedby="emailHelp"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label for="input-password">Password</label>
        <div className="password_input_container">
          <input
            type={viewPassword ? "text" : "password"}
            class="form-control form-control-sm"
            id="input-password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="hide_password"
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <EyeFilled /> : <EyeOutlined />}
          </button>
        </div>
      </div>

      <div class="form-group form-check-inline d-flex justify-content-end">
        {isLoading ? (
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import client from "../../apiConfig/api";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      dispatch({ type: "LOGIN_REQUEST", payload: values });
    } catch (err) {
      console.log(err);
    }
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
        <input
          type="password"
          class="form-control form-control-sm"
          id="input-password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <div class="form-group form-check-inline d-flex justify-content-end">
        {isLoading ? (
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const changeHandle = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post(
        "https://ca-backend-api.onrender.com/companyRegister/auth/signin",
        data
      )
      .then((res) => {
        console.log(res.data.result.token);
        setData(res.data);
        localStorage.setItem("token", res.data.result.token);
        alert("Login successfully!");
      })

      .catch((err) => {
        console.log(err);
      });
    setData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div class="modal p-6">
          <form class="form p-12">
            <h2 className="text-center text-xl" style={{ fontSize: "2rem" }}>
              Let's Login Now!
            </h2>
            <div class="credit-card-info--form">
              <div class="input_container">
                <label class="input_label">Email</label>
                <input
                  class="input_field w-full"
                  type="email"
                  name="email"
                  title="Inpit title"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={changeHandle}
                />
              </div>
              <div class="input_container">
                <label class="input_label">Password</label>
                <input
                  class="input_field w-full"
                  type="text"
                  name="password"
                  title="Inpit title"
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={changeHandle}
                />
              </div>
            </div>
            <button class="purchase--btn" onClick={handleClick}>
              Login
            </button>
            <a>
              by continuing, you accept the{" "}
              <span className="tetx-blue-400">Terms and Conditions</span>
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

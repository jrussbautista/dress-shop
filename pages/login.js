import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import baseURL from "../utils/baseURL";
import axios from "axios";
import { autoLogin } from "../utils/auth";

const SignUp = () => {
  const userObj = {
    email: "",
    password: ""
  };

  const [user, setUser] = useState(userObj);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseURL}/api/login`, user);
      autoLogin(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <Layout>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit"> Login </button>
            </div>
          </form>
        </div>
      </Layout>
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 2rem auto;
          }
        `}
      </style>
    </>
  );
};

export default SignUp;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import baseURL from "../utils/baseURL";
import axios from "axios";

const SignUp = () => {
  const userObj = {
    email: "",
    name: "",
    password: ""
  };

  const [user, setUser] = useState(userObj);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseURL}/api/signup`, user);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <Layout>
        <div className="container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="page-heading"> Sign Up </h1>
            <div className="group">
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <button type="submit" className="btn">
                {" "}
                Sign Up{" "}
              </button>
            </div>
            <Link href="/login">
              <a className="link"> Login your Account</a>
            </Link>
          </form>
        </div>
      </Layout>
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 2rem auto;
          }

          .page-heading {
            font-size: 3rem;
            text-transform: uppercase;
          }

          .auth-form {
            padding: 2rem 0;
            width: 50rem;
            margin: 0 auto;
          }

          .auth-form .input {
            width: 100%;
            height: 5rem;
            padding: 0 1.5rem;
            font-size: 1.7rem;
            border: 1px solid transparent;
            border-bottom: 1px solid #666;
          }

          .auth-form .input:focus {
             outline: none;
          }

          .group {
            margin-top: 2.5rem;
          }

          .auth-form .btn {
            width: 100%;
            height 6rem;
            background-color: var(--color-dark);
            color: #fff;
            font-size: 2rem;
            font-family: inherit;
            border: 1px solid var(--color-dark);
            cursor: pointer;
          }

          .link {
            margin-top: 1rem;
            color: var(--color-dark);
            display: inline-block;
            font-size: 1.7rem;
          }
        `}
      </style>
    </>
  );
};

export default SignUp;

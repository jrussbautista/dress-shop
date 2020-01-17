import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import baseURL from "../utils/baseURL";
import axios from "axios";
import cookie from "js-cookie";

const Account = () => {
  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = cookie.get("token");
        const payload = { headers: { Authorization: token } };
        const { data } = await axios.get(`${baseURL}/api/orders`, payload);
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getOrders();
  }, []);

  return <Layout>Order page here</Layout>;
};

export default Account;

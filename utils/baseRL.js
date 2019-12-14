const baseURL =
  process.env.NODE_ENV === "production"
    ? "product-site-url-here"
    : "http://localhost:3000";

export default baseURL;

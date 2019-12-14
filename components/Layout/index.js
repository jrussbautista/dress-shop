import Head from "next/head";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";

export default ({ children, title = "Dress Shop" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </>
  );
};

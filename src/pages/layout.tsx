import React, { PropsWithChildren } from "react";
import CustomNavbar from "../components/navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};

export default Layout;

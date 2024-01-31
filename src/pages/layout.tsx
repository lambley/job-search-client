import React, { PropsWithChildren } from "react";
import CustomNavbar from "../components/navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="window">
      <CustomNavbar />
      {children}
    </div>
  );
};

export default Layout;

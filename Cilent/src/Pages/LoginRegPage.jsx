import React from "react";
import { Outlet } from "react-router-dom";
const LoginRegPage = () => {
  return (
    <div>
      This is LoginRegPage
      <div>this the body</div>
      <Outlet />
    </div>
  );
};

export default LoginRegPage;

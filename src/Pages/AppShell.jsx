import React from "react";
import { Outlet } from "react-router-dom";

import AuthPopup from "../components/AuthPopup/AuthPopup";

const AppShell = () => {
  return (
    <>
      <Outlet />
      <AuthPopup />
    </>
  );
};

export default AppShell;

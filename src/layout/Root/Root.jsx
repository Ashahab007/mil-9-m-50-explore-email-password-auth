import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/NavBar/NavBar";

const Root = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
};

export default Root;

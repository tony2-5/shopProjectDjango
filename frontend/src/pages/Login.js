import React from "react";
import LoginRegisterForm from "../components/LoginRegisterForm";
import NavBar from "../components/NavBar";

export default function Login() {
  return (
    <>
      <NavBar></NavBar>
      <LoginRegisterForm method='login'/>
    </>
  )
}
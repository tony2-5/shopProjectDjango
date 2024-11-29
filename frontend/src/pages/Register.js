import React from "react";
import LoginRegisterForm from "../components/LoginRegisterForm";
import NavBar from "../components/NavBar"

export default function Register() {
  return (
    <>
     <NavBar></NavBar>
     <LoginRegisterForm method='register'/>
    </>
  )
}
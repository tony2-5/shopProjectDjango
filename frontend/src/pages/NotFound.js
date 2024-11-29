import React from "react";
import NavBar from "../components/NavBar";

export default function NotFound() {
  return (
    <>
      <NavBar></NavBar>
      <div>404 Not Found</div>
      <div>The requested url does not exist on this server</div>
    </>
  )
}
import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Thankyou() {
  const location = useLocation()
  const [ total, setTotal ] = useState(0)
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(location.state.total) {
      setTotal(location.state.total)
    }
  },[location])

  return (
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Thank you for shopping!</h5>
          <p class="card-text d-flex justify-content-center">Transaction Total: ${total}</p>
        </div>
        <div className="form-group d-flex justify-content-center p-2">
          <button className="btn btn-primary" onClick={()=>{navigate("/")}}>Return to Shop</button>
        </div>
      </div>
    </div>
  )
}
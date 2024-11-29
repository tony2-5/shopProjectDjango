import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { Link } from 'react-router-dom';

export default function NavBar() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <div className="nav">
          <div className="nav-item">
            <Link className="nav-link" to="/">Product Page</Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </div>
          {!accessToken && 
            <div className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </div>
          }
          {!accessToken &&
            <div className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </div>
          }
          {accessToken && 
            <div className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}
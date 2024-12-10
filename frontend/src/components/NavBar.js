import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { Link } from 'react-router-dom';

export default function NavBar({totalItems}) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <div className="nav">
          <div className="nav-item">
            <Link className="nav-link" to="/">Product Page</Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/cart">Cart {totalItems>0 && `(${totalItems})`}</Link>
          </div>
          {/* Show/hide certain links depending on if the user is logged in or not */}
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
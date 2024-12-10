import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

// parent component to ensure user is signed in on protected components
function ProtectedRoute({children}) {
  const [isAuthorized, setIsAuthorized] = useState(null)

  useEffect(() => {
    // call auth function on component render
    auth().catch(()=>setIsAuthorized(false))
  })

  // if jwt token expired function to get new jwt access token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const res = await api.post("/api/token/refresh/", {refresh: refreshToken})
      if(res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
        window.document.refresh()
      }
    } catch(error) {
      setIsAuthorized(false)
    }
  }

  // function to check users jwt token and authorize
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if(!token) {
      setIsAuthorized(false)
      return
    }
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000

    if(tokenExpiration<now) {
      await refreshToken()
    } else {
      setIsAuthorized(true)
    }
  }

  if(isAuthorized===null) {
    return <div>Loading...</div>
  }
  return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute
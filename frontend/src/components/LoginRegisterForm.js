import React from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginRegisterForm({method}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if(method==='login') {
      try {
        const res = await api.post('/api/token/',{ username, password })
        console.log(res)
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate('/')
      } catch(error) {
        setError(error.response.data.detail)
      }
    } else {
      try {
        await api.post('/api/user/register/', { username, email, password })
        navigate('/login')
      } catch(error) {
        if(error.response.data.username) {
          setError(error.response.data.username)
        } else if(error.response.data.email) {
          setError(error.response.data.email)
        } 
      }
    }
  }

  return (
    <form className="d-flex justify-content-center align-items-center h-75" onSubmit={submit}> 
      <div className="card p-4">
        {
        method==='register' && 
          <div className="form-group pb-2">
            <label for='email'>Email</label>
            <input 
              className="form-control"
              type='text' 
              name='email'
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        }
        <div className="form-group pb-2">
          <label for='username'>Username</label>
          <input 
            className="form-control"
            type='text' 
            name='username'
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>
        <div className="form-group pb-2">
          <label for='password'>Password</label>
          <input
            className="form-control" 
            type='password' 
            name='password'
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="form-group p-2 d-flex justify-content-center">
          {method === 'login' ? 
          <button className="btn btn-primary" type='submit'>Login</button> 
          : 
          <button className="btn btn-primary" type='submit'>Register</button>
          }
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </div>
    </form>
  )
}
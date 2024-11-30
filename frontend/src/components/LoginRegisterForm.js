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

  const submit = async (e) => {
    e.preventDefault()
    if(method==='login') {
      const res = await api.post('/api/token/',{ username, password })
      localStorage.setItem(ACCESS_TOKEN, res.data.access)
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
      navigate('/')
    } else {
      await api.post('/api/user/register/',{ username, email, password })
      navigate('/login')
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
            <button className="btn btn-primary" type='submit'>Login</button>
          }
        </div>
      </div>
    </form>
  )
}
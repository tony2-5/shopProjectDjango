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
    <form onSubmit={submit}> 
      {
      method==='register' && 
        <div>
          <label for='email'>Email</label>
          <input 
            type='text' 
            name='email'
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
      }
      <div>
        <label for='username'>Username</label>
        <input 
          type='text' 
          name='username'
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>
      <div>
        <label for='password'>Password</label>
        <input 
          type='password' 
          name='password'
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <div>
        {method === 'login' ? <button type='submit'>Login</button> : <button type='submit'>Login</button>}
      </div>
    </form>
  )
}
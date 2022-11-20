import React, { useState, useContext } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setAuthState } = useContext(AuthContext)

  const navigate = useNavigate()

  const login = () => {
    const data = { username: username, password: password }
    axios.post('http://localhost:8080/auth/login', data).then((response) => {
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error)
      } else {
        localStorage.setItem("accessToken", response.data)
        setAuthState(true)
        navigate('/')
      }
    })
  }
  return (
    <div className="loginContainer">
      <input onChange={(e) => setUsername(e.target.value)} type="text" />
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
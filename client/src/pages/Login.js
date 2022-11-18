import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const login = () => {
    const data = { username: username, password: password }
    axios.post('http://localhost:8080/auth/login', data).then((response) => {
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error)
      } else {
        sessionStorage.setItem("accessToken", response.data)
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
import React, { useState } from 'react'
import axios from "axios"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    const data = { username: username, password: password }
    axios.post('http://localhost:8080/auth/login', data).then((response) => {
      console.log(response.data);
    })
  }
  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} type="text" />
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Profile() {
  let { id } = useParams()
  const [username, setUsername] = useState()
  const [listOfPosts, setListOfPosts] = useState()
  const navigate = useNavigate()
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username)
    })
    axios.get(`http://localhost:8080/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data)
    })
  }, [])

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        {
          authState.username === username &&
          <button onClick={() => navigate('/changepassword')}>Change my password</button>
        }
      </div>
      <div className="listOfPosts">
        {listOfPosts && listOfPosts.map((value, key) => {
          console.log(value);
          return (
            <div key={key} className="post">
              <div className="title">{value.title}</div>
              <div className="body" onClick={() => navigate(`/post/${value.id}`)}>{value.postText}</div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="listOfPosts"></div>
    </div>
  )
}

export default Profile
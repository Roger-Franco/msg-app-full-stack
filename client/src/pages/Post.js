import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/byId/${id}`).then((response) => {
      setPostObject(response.data)
      // console.log(response, 'response');
    })
    axios.get(`http://localhost:8080/comments/${id}`).then((response) => {
      setComments(response.data)
    })
  }, [])

  const addComment = () => {
    axios.post("http://localhost:8080/comments", {
      commentBody: newComment,
      PostId: id
    },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }
    ).then((resp) => {
      if (resp.data.error) {
        alert(resp.data.error)
      } else {
        const commentToAdd = { commentBody: newComment, username: resp.data.username }
        // console.log("Comment Added!!");
        setComments([...comments, commentToAdd])
        setNewComment("")
      }
    })
  }

  const deleteComment = (id) => {
    axios.delete(`http://localhost:8080/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then(() => {
      setComments(comments.filter((val) => {
        return val.id !== id
      }))
    })
  }

  const deletePost = (id) => {
    axios.delete(`http://localhost:8080/posts/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then(() => {
      navigate('/')
    })
  }

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt('Enter new title')
      axios.put('http://localhost:8080/posts/title', { newTitle: newTitle, id: id }, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      })
      setPostObject({ ...postObject, title: newTitle })
    } else {
      let newPostText = prompt('Enter new text')
      axios.put('http://localhost:8080/posts/postText', { newText: newPostText, id: id }, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      })
      setPostObject({ ...postObject, postText: newPostText })
    }
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title" onClick={() => {
            if (authState.username === postObject.username) {
              editPost("title")
            }
          }}>{postObject.title}</div>
          <div className="body" onClick={() => {
            if (authState.username === postObject.username) {
              editPost("body")
            }
          }}>{postObject.postText}</div>
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <button onClick={() => deletePost(id)}>Delete Post</button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            value={newComment}
            type="text"
            placeholder="Comments..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comments</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {authState.username === comment.username &&
                  <button onClick={() => deleteComment(comment.id)}>X</button>
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Post
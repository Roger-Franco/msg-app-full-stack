import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

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
    }).then((resp) => {
      const commentToAdd = { commentBody: newComment }
      // console.log("Comment Added!!");
      setComments([...comments, commentToAdd])
      setNewComment("")
    })
  }
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
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
            return <div key={key} className="comment">{comment.commentBody}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Post
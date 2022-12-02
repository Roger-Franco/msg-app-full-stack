import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:8080/posts",
      { headers: { accessToken: localStorage.getItem('accessToken') } })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => {
          return like.PostId
        }));
      })
  }, [])
  console.log(likedPosts.filter((like) => like === 6), 'likedPosts.filter((like) => like === value.id)')

  const likeAPost = (postId) => {
    axios.post("http://localhost:8080/likes",
      { PostId: postId },
      { headers: { accessToken: localStorage.getItem('accessToken') } }
    ).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {
            return { ...post, Likes: [...post.Likes, 0], Liked: true }
            // return { ...post, Likes: [...post.Likes, 0], Liked: true } => um caminho ...
          } else {
            const likesArray = post.Likes
            likesArray.pop()
            return { ...post, Likes: likesArray, Liked: false }
            // return { ...post, Likes: likesArray, Liked: false } => um caminho para mudar a cor do Like
          }
        } else {
          return post
        }
      }))
    })
  }

  return (
    <div>
      {listOfPosts.map((value, key) => {
        console.log(value);
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div className="body" onClick={() => navigate(`/post/${value.id}`)}>{value.postText}</div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => likeAPost(value.id)}
                  // className={value.Liked ? "likeBttn" : "unlikeBttn"}
                  className={likedPosts.includes(value.id) ? "likeBttn" : "unlikeBttn"}
                />
                {/* <ThumbUpAltIcon onClick={() => likeAPost(value.id)} className="unlikeBttn" /> */}
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
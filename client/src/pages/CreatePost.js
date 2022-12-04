import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {
  const navigate = useNavigate()
  const { authState } = useContext(AuthContext)

  const initialValues = {
    title: '',
    postText: '',
    username: '',
  }

  useEffect(() => {
    if (!authState.status) {
      navigate('/login')
    }
  }, [])

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Você precisa de um título!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/posts", data).then((response) => {
      // console.log("It worked");
      // console.log(data);
      navigate('/')
    });
  }
  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label htmlFor="">Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="inputCreatePost" name="title" placeholder="(Ex. Title...)" />
          <label htmlFor="">Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field id="inputCreatePost" name="postText" placeholder="(Ex. Post...)" />
          <label htmlFor="">Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field id="inputCreatePost" name="username" placeholder="(Ex. Roger123...)" />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div >
  )
}

export default CreatePost
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getPosts } from "../actions/post.action";

const PostForm = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const handleForm = async (e) => {
    e.preventDefault();
    dispatch(getPosts());
  };

  console.log(typeof posts[0].nom)

  return (
    <div className="form-container">
    <h1>{posts[0].nom}</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <p>{posts[0].questions[0].text}</p>
        <input
          type="radio"
          name="test"
          id="1"
        />
        <label>oui</label>
        <input
          type="radio"
          name="test"
          id="2"
        />
        <label>non</label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PostForm;

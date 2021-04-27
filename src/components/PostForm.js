import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getPosts } from "../actions/post.action";
import Question from "./Question";

const PostForm = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const handleForm = async (e) => {
    e.preventDefault();
    dispatch(getPosts());
  };

  console.log(typeof posts[0])

  return (
    <div className="for-container">
    <h1>{posts[0].nom}</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <Question posts= {posts} valeur = {0} name = {"1"} />
        <Question posts= {posts} valeur = {1} name = {"2"}/>
        <Question posts= {posts} valeur = {2} name = {"3"}/>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PostForm;

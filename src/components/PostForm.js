import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.action";
import Question from "./Question";

const PostForm = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const handleForm = async (e) => {
    e.preventDefault();
    dispatch(getPosts());

    var tab_cate = {}
    for (var a=0; a<posts[0].results.length; a++) {
      tab_cate[posts[0].results[a]] = 0
    }

    for (var i=0; i<posts[0].questions.length; i++ ) {
      var boutons = document.getElementsByName(i.toString());
      for(var j = 0; j < boutons.length; j++){
        if (posts[0].type==="oui/non"){
          if(boutons[j].checked && boutons[j].value==='oui'){
            tab_cate[posts[0].questions[i].awardedPoint] += 1
            }
        }
        else {
          if(boutons[j].checked) {
            tab_cate[posts[0].questions[i].answers[j].awardedPoint] += 1
          }
        }
        
      }
    }

    for (var b in tab_cate){
      document.write(b + "=" + tab_cate[b] + '<br>')
    }
  };
  

  console.log(typeof posts[0])

  

  return (
    
    <div className="for-container">
    <h1>{posts[0].nom}</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <Question posts= {posts} valeur = {0} nom = {"0"}/>
        <Question posts= {posts} valeur = {1} nom = {"1"}/>
        <Question posts= {posts} valeur = {2} nom = {"2"}/>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PostForm;

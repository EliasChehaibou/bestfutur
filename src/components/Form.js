import {React, useState, useEffect} from "react";
import BestFuturHeader from "./header";

const Form = () => {

  const [forms, setForms] = useState(null);

  useEffect( ()=> {
    fetch('http://localhost:3004/posts')
        .then( (response) => {
          return response.json();
        })
        .then( (data)=>{
          setForms(data)
        })
    }, [])

  var cpt = 1
  var tab_cate = {}

  function calcul () {
    for (var i=0; i<forms[0].questions.length; i++) {     
      var boutons = document.getElementsByName(i.toString());
      for(var j = 0; j < boutons.length; j++){
        if (forms[0].type==="oui/non"){
          if(boutons[j].checked && boutons[j].value==='oui'){
            tab_cate[forms[0].questions[i].awardedPoint] += 1
            }
        }
        else {
          if(boutons[j].checked) {
            tab_cate[forms[0].questions[i].answers[j].awardedPoint] += 1
          }
        }
      }
    }
  }

  function check () {
    var check = false
    var compteur = 0

    for (var i=0; i<forms[0].questions.length; i++) {     
      var boutons = document.getElementsByName(i.toString());
      for(var j = 0; j < boutons.length; j++){
        if(boutons[j].checked){
          compteur +=1
          }
      }
    }

    if (((forms[0].questions.length)-((cpt-1)*10))>0) {
      if ( compteur===10) {
        check=true
      }
    }
    else if (compteur==(forms[0].questions.length-(((cpt-1)*10)-10))) {
      check=true
    }
    
    return check
  }

  const handleBtn = async (e) => {
    e.preventDefault();

    if (document.getElementById("err")) {
      document.getElementById("err").remove()
    }

    if (check() || cpt===1) {
      if (cpt===1) {
        for (var a=0; a<forms[0].results.length; a++) {
          tab_cate[forms[0].results[a]] = 0
        }
      }

      calcul()

      if (document.getElementById("img") && document.getElementById("txt") ) {
        document.getElementById("img").remove()
        document.getElementById("txt").remove()
      }

      if (document.getElementById("in")) {
        document.getElementById("in").remove()
      }

      if (document.getElementById("rep")) {
        document.getElementById("rep").remove()
      }

      if (document.getElementById("mult")) {
        document.getElementById("mult").remove()
      }

      document.getElementById('qst').innerHTML += ('<div id="mult"></div>')


      if ((cpt*10)<=forms[0].questions.length){
        if (forms[0].type==="oui/non") {
          for (var i=((cpt*10)-10); i<(cpt*10); i++ ){
            document.getElementById('mult').innerHTML += ('<div id='+i.toString()+' class="control"><p class="questions" name="question">'+forms[0].questions[i].text+'</p><label class="lbl" id ="lbl1"><input type="radio" name='+i.toString()+' id="'+forms[0].nom+"1"+'" value="oui"/> oui</label><label class="lbl"><input type="radio" name='+i.toString()+' id='+forms[0].nom+"2"+' value="non"/> non</label></div>')
          }
        }
        else {
          for (var i=((cpt*10)-10); i<(cpt*10); i++ ){
            document.getElementById('mult').innerHTML += ('<div id='+i.toString()+' class="control"><p class="questions" id='+i.toString+' name="question">'+forms[0].questions[i].text+'</p>')
            for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
              document.getElementById('mult').innerHTML += ('<label id="bl'+j.toString()+'" class="lbl"><input type="radio" name='+i.toString()+' id='+forms[0].nom+"1"+'/> '+forms[0].questions[i].answers[j].answerText+'</label></div>')
            }
          }
        }
        document.getElementById('prog').innerHTML += ('<div id="rep" class="progress"><p>Votre progression: </p><progress id="barre" max="100" value='+(((cpt-1)*1000)/forms[0].questions.length).toString()+'></progress><p>'+Math.round((((cpt-1)*1000)/forms[0].questions.length)).toString()+'%</p></div>')
        document.getElementById('form').innerHTML += ('<input class="btn" id="in" type="submit" value="Page suivante"/>')
        cpt +=1
      }

      else {
        if ((cpt*10)-forms[0].questions.length>0) {
          if (forms[0].type==="oui/non") {
            for (var i=((cpt*10)-10); i<forms[0].questions.length; i++ ){
              document.getElementById('mult').innerHTML += ('<div id='+i.toString()+' class="control"><p class="questions" name="question">'+forms[0].questions[i].text+'</p><label class="lbl" id ="lbl1"><input type="radio" name='+i.toString()+' id="'+forms[0].nom+"1"+'" value="oui"/> oui</label><label class="lbl"><input type="radio" name='+i.toString()+' id='+forms[0].nom+"2"+' value="non"/> non</label></div>')
            }
          }
          else {
            for (var i=((cpt*10)-10); i<forms[0].questions.length; i++ ){
              document.getElementById('mult').innerHTML += ('<div id='+i.toString()+' class="control"><p class="questions" name="question" id='+i.toString+'>'+forms[0].questions[i].text+'</p>')
              for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
                document.getElementById('mult').innerHTML += ('<label name="lbl" class="lbl"><input type="radio" name='+i.toString()+' id='+forms[0].nom+"1"+'/> '+forms[0].questions[i].answers[j].answerText+'</label></div>')
              }
            }
          }
        }
        document.getElementById('prog').innerHTML += ('<div id="rep" class="progress" ><p>Votre progression: </p><progress id="barre" max="100" value='+(((cpt-1)*1000)/forms[0].questions.length).toString()+'></progress><p>'+Math.round((((cpt-1)*1000)/forms[0].questions.length)).toString()+'%</p></div>')
        document.getElementById('fin').innerHTML += ('<input class="btn" id="btn-fin" type="submit" value="Terminer le questionnaire"/>')
        cpt+=1

      }
    }
    else{
      document.getElementById('nocheck').innerHTML += ("<p id='err'>Il faut d'abord répondre à toutes les questions!</p>")
    }
  }
  
  const handleForm = async (e) => {
    e.preventDefault();

    if (document.getElementById("err")) {
      document.getElementById("err").remove()
    }

    if (check() || cpt===1) {
      calcul()

      if (document.getElementById("rep")) {
        document.getElementById("rep").remove()
      }

      if (document.getElementById("in")) {
        document.getElementById("in").remove()
      }

      if (document.getElementById("btn-fin")) {
        document.getElementById("btn-fin").remove() 
      }

      if (document.getElementById("mult")) {
        document.getElementById("mult").remove()
      }

      for (var b in tab_cate){
        document.getElementById('qst').innerHTML += ('<div>'+b + "=" + tab_cate[b] + '<br/></div>')
      }
    }
    else{
      document.getElementById('nocheck').innerHTML += ("<p id='err'>Il faut d'abord répondre à toutes les questions!</p>")
    }
  }

  return (
    <>
      {forms && <div className="for-container">
        <BestFuturHeader/>
        <div class="bloc">
          <h1 class="titre">{forms[0].nom}</h1>
          <img class="image" src={forms[0].image} id="img"/>
          <p class="texte" id="txt">{forms[0].texte}</p>
          <form onSubmit={(e) => handleForm(e)}>
            <div id="prog"></div>
            <div id="qst"></div>
            <div id="fin"></div>
          </form>
          <form id= 'form' onSubmit ={(e) => handleBtn(e)}>
              <input class="btn-d" id="in" type="submit" value="Démarrer le questionnaire"/>
          </form>
          <div id="nocheck"></div>
        </div>
      </div>}
    </>
  )

}

export default Form;
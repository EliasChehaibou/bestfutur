import {React, useState, useEffect} from "react";
import BestFuturHeader from "./header";
import visualisation from './visualisation'


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

      if (document.getElementById("headerEmo") && document.getElementById("txt") ) {
        document.getElementById("headerEmo").remove()
        document.getElementById("txt").remove()
      }

      if (document.getElementById("in")) {
        document.getElementById("in").remove()
      }

      if (document.getElementById("rep")) {
        document.getElementById("rep").remove()
      }
      if (document.getElementById("qst")) {
        document.getElementById("qst").remove()
        document.getElementById('qstform').innerHTML += ('<div id="qst"></div>')
      }

      if (document.getElementById("mult")) {
        document.getElementById("mult").remove()
      }

      document.getElementById('qst').innerHTML += ('<div id="mult"></div>')

      var cpt_color = 1000

      if ((cpt*10)<=forms[0].questions.length){
        if (forms[0].type==="oui/non") {
          for (var i=((cpt*10)-10); i<(cpt*10); i++ ){
            document.getElementById('qst').innerHTML += ('<div id='+i.toString()+' class="control"><p class="questions" name="question">'+forms[0].questions[i].text+'</p><div class="lblcontrol"><input type="radio" name='+i.toString()+' id="color-'+i.toString()+'" value="oui"/><label for="color-'+i.toString()+'"><span><img src="/static/check-icn.svg" alt="Checked Icon" /></span></label><input type="radio" name='+i.toString()+' id="color-'+cpt_color.toString()+'" value="non"/><label class="lbl" for="color-'+cpt_color.toString()+'"><span><img src="/static/check-icn.svg" alt="Checked Icon" /></span></label></div></div>')
            cpt_color-=1
          }
        }
        else {
          for (var i=((cpt*10)-10); i<(cpt*10); i++ ){
            document.getElementById('mult').innerHTML += ('<p class="questions" id='+i.toString+' name="question">'+forms[0].questions[i].text+'</p>')
            for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
              document.getElementById('mult').innerHTML += ('<input type="radio" name='+i.toString()+' id="color-'+i.toString()+j.toString()+'"/><label for="color-'+i.toString()+j.toString()+'"><span><img src="/static/check-icn.svg" alt="Checked Icon" /></span><p class="answer">'+forms[0].questions[i].answers[j].answerText+'</p></label>')
            }
          }
        }
        document.getElementById('prog').innerHTML += ('<div id="rep" class="progress"><p>Ta progression: </p><progress id="barre" max="100" value='+(((cpt-1)*1000)/forms[0].questions.length).toString()+'></progress><p>'+Math.round((((cpt-1)*1000)/forms[0].questions.length)).toString()+'%</p></div>')
        document.getElementById('form').innerHTML += ('<input class="btn" id="in" type="submit" value="Page suivante"/>')
        cpt+=1
      }

      else {
        if ((cpt*10)-forms[0].questions.length>0) {
          if (forms[0].type==="oui/non") {
            for (var i=((cpt*10)-10); i<forms[0].questions.length; i++ ){
              document.getElementById('qst').innerHTML += ('<div id='+i.toString()+' class="control"><p class="questions" name="question">'+forms[0].questions[i].text+'</p><div class="lblcontrol"><input type="radio" name='+i.toString()+' id="color-'+i.toString()+'" value="oui"/><label for="color-'+i.toString()+'"><span><img src="/static/check-icn.svg" alt="Checked Icon" /></span></label><input type="radio" name='+i.toString()+' id="color-'+cpt_color.toString()+'" value="non"/><label class="lbl" for="color-'+cpt_color.toString()+'"><span><img src="/static/check-icn.svg" alt="Checked Icon" /></span></label></div></div>')
              cpt_color-=1
            }
          }
          else {
            for (var i=((cpt*10)-10); i<forms[0].questions.length; i++ ){
              document.getElementById('mult').innerHTML += ('<p class="questions" name="question" id='+i.toString+'>'+forms[0].questions[i].text+'</p>')
              for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
                document.getElementById('mult').innerHTML += ('<input type="radio" name='+i.toString()+' id="color-'+i.toString()+j.toString()+'"/><label for="color-'+i.toString()+j.toString()+'"><span><img src="/static/check-icn.svg" alt="Checked Icon" /></span><p class="answer">'+forms[0].questions[i].answers[j].answerText+'</p></label>')
              }
            }
          }
        }
        document.getElementById('prog').innerHTML += ('<div id="rep" class="progress" ><p>Ta progression: </p><progress id="barre" max="100" value='+(((cpt-1)*1000)/forms[0].questions.length).toString()+'></progress><p>'+Math.round((((cpt-1)*1000)/forms[0].questions.length)).toString()+'%</p></div>')
        document.getElementById('qstform').innerHTML += ('<div id="fin"></div>')
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
      if (document.getElementById("qst")) {
        document.getElementById("qst").remove()
      }
      if (document.getElementById("mult")) {
        document.getElementById("mult").remove()
      }

      document.getElementById('res').innerHTML += ("<p>Tes résultats :</p>")
      visualisation(tab_cate)

    }
    else{
      document.getElementById('nocheck').innerHTML += ("<p id='err'>Il faut d'abord répondre à toutes les questions!</p>")
    }
  }

  const handleDep = async (e) => {
    e.preventDefault();

    document.getElementById('btn').remove()
    document.getElementById('img').remove()
    document.getElementById('txt').remove()

    document.getElementById('tete').innerHTML += ("<div class='headerEmo' id='headerEmo'/><div class='emoji'><img src='static/emojichrono.png'/><br/><span>Ça dure moins de 15 minutes</span></div><div class='emoji'><img src='static/emoji100.png'/><br/><span>Répondez à toutes les questions</span></div></div>")
    document.getElementById('tete').innerHTML += ("<p class='texte' id='txt'>"+forms[0].consignestxt+"</p>")
    document.getElementById('form').innerHTML += ("<input class='btn-d' id='in' type='submit' value='START'/>")
  }

  return (
    <>
      {forms && <div className="for-container">
        <BestFuturHeader/>
        <div class="bloc">
          <div id="tete">
            <img class="image" src={forms[0].image} id="img"/>
            <div class="entete">
              <h1 class="titre">{forms[0].nom} ©️</h1>
              <img class="logo" src="static/logo.jpg" id="lg"/>
            </div>
            <p class="texte" id="txt">{forms[0].texte}</p>
          </div>
          <form id="qstform" onSubmit={(e) => handleForm(e)}>
            <div id="prog"></div>
            <div id="qst"></div>
          </form>
          <form id='form' onSubmit ={(e) => handleBtn(e)}>            
          </form>
          <form  onSubmit ={(e) => handleDep(e)}>
            <input class="btn-d" id="btn" type="submit" value="Démarrer le questionnaire"/>
          </form>
          <div id="nocheck"></div>
          <div id="res"></div>
          <div id="visu"></div>     
        </div>
      </div>}
    </>
  )

}

export default Form;
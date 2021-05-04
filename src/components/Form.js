import {React, useState, useEffect} from "react";

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

  const handleBtn = async (e) => {
    e.preventDefault();

    if (cpt===1) {
      for (var a=0; a<forms[0].results.length; a++) {
        tab_cate[forms[0].results[a]] = 0
      }
    }

    calcul()

    if (document.getElementById("in")) {
      document.getElementById("in").remove()
    }
    if (document.getElementById("barre")) {
      document.getElementById("barre").remove()
    }
    
    for (var j=(((cpt-1)*10)-10); j<((cpt-1)*10); j++ ){ 
      if (document.getElementById(j.toString())) {
        document.getElementById(j.toString()).remove()
      } 
    }

    if ((cpt*10)<=forms[0].questions.length){
      if (forms[0].type==="oui/non") {
        for (var i=((cpt*10)-10); i<(cpt*10); i++ ){
          document.getElementById('qst').innerHTML += ('<div id='+i.toString()+'><p>'+forms[0].questions[i].text+'</p><input type="radio" name='+i.toString()+' id="'+forms[0].nom+"1"+'" value="oui"/><label>oui</label><input type="radio" name='+i.toString()+' id='+forms[0].nom+"2"+' value="non"/><label>non</label></div>')
        }
      }
      else {
        for (var i=((cpt*10)-10); i<(cpt*10); i++ ){
          document.getElementById('qst').innerHTML += ('<p id='+i.toString+'>'+forms[0].questions[i].text+'</p>')
          for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
            document.getElementById('qst').innerHTML += ('<input type="radio" name='+i.toString()+' id='+forms[0].nom+"1"+'/><label>'+forms[0].questions[i].answers[j].answerText+'</label>')
          }
        }
      }
      document.getElementById('prog').innerHTML += ('<progress id="barre" max="100" value='+((cpt*1000)/forms[0].questions.length).toString()+'></progress>')
      document.getElementById('form').innerHTML += ('<input id="in" type="submit" value="Page suivante"/>')
      cpt +=1
    }

    else {
      if ((cpt*10)-forms[0].questions.length>0) {
        if (forms[0].type==="oui/non") {
          for (var i=((cpt*10)-10); i<forms[0].questions.length; i++ ){
            document.getElementById('qst').innerHTML += ('<div id='+i.toString()+'><p>'+forms[0].questions[i].text+'</p><input type="radio" name='+i.toString()+' id="'+forms[0].nom+"1"+'" value="oui"/><label>oui</label><input type="radio" name='+i.toString()+' id='+forms[0].nom+"2"+' value="non"/><label>non</label></div>')
          }
        }
        else {
          for (var i=((cpt*10)-10); i<forms[0].questions.length; i++ ){
            document.getElementById('qst').innerHTML += ('<p id='+i.toString+'>'+forms[0].questions[i].text+'</p>')
            for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
              document.getElementById('qst').innerHTML += ('<input type="radio" name='+i.toString()+' id='+forms[0].nom+"1"+'/><label>'+forms[0].questions[i].answers[j].answerText+'</label>')
            }
          }
        }
      }
      document.getElementById('prog').innerHTML += ('<progress id="barre" max="100" value='+((cpt*1000)/forms[0].questions.length).toString()+'></progress>')
      document.getElementById('fin').innerHTML += ('<br/><input type="submit" value="Terminer le questionnaire"/>')
    }
   
  }
  
  const handleForm = async (e) => {
    e.preventDefault();

    calcul()

    for (var b in tab_cate){
      document.write('<div>'+b + "=" + tab_cate[b] + '<br/></div>')
    }
  }

  return (
    <>
      {forms && <div className="for-container">
        <h1>{forms[0].nom}</h1>
        <form onSubmit={(e) => handleForm(e)}>
          <div id="prog"></div>
          <div id="qst"></div>
          <div id="fin"></div>
        </form>
        <form id= 'form' onSubmit ={(e) => handleBtn(e)}>
            <input id="in" type="submit" value="Démarrer le questionnaire"/>
            <br/>
        </form>
      </div>}
    </>
  )

}

export default Form;
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

  const handleBtn = async (e) => {
    e.preventDefault();
    document.getElementById("in").remove()
    document.getElementById('fin').innerHTML += ('<br/><input type="submit" value="Terminer le questionnaire"/>')

    if (forms[0].type==="oui/non") {
      for (var i=0; i<forms[0].questions.length; i++ ){
        document.getElementById('qst').innerHTML += ('<div><p>'+forms[0].questions[i].text+'</p><input type="radio" name='+i.toString()+' id='+forms[0].nom+"1"+' value="oui"/><label>oui</label><input type="radio" name='+i.toString()+' id='+forms[0].nom+"2"+' value="non"/><label>non</label></div>')
      }
    }
    else {
      for (var i=0; i<forms[0].questions.length; i++ ){
        document.getElementById('qst').innerHTML += ('<p>'+forms[0].questions[i].text+'</p>')
        for (var j=0; j<forms[0].questions[i].answers.length; j++ ){
          document.getElementById('qst').innerHTML += ('<input type="radio" name='+i.toString()+' id='+forms[0].nom+"1"+'/><label>'+forms[0].questions[i].answers[j].answerText+'</label>')
        }
      }
    }
  }
  const handleForm = async (e) => {
    e.preventDefault();
    var tab_cate = {}

    for (var a=0; a<forms[0].results.length; a++) {
      tab_cate[forms[0].results[a]] = 0
    }

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

    for (var b in tab_cate){
      document.write('<div>'+b + "=" + tab_cate[b] + '<br/></div>')
    }

  }
  console.log(forms)
  return (
    <>
      {forms && <div className="for-container">
        <h1>{forms[0].nom}</h1>
        <form onSubmit ={(e) => handleBtn(e)}>
            <input id="in" type="submit" value="Démarrer le questionnaire"/>
        </form>
        <form onSubmit={(e) => handleForm(e)}>
          <div id="qst"></div>                
          <div id="fin"></div>
        </form>
        <p id='fin'></p>
      </div>}
    </>
  )

}

export default Form;
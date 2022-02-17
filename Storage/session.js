document.getElementById ("local").addEventListener ("click",localIncrement );
document.getElementById ("session").addEventListener ("click",sessionIncrement );


if(!localStorage.getItem("value"))
    localStorage.setItem("value","0");

if(!sessionStorage.getItem("value")){
    sessionStorage.setItem("value","0");
}
render();


 function localIncrement(){
    let localNum = parseInt(localStorage.getItem("value"));
    localNum++;
    localStorage.setItem("value",JSON.stringify(localNum));
    renderLocalIncrement();
   
}
 function sessionIncrement(){

    let sessionNum = parseInt(sessionStorage.getItem("value"));
    sessionNum++;
    sessionStorage.setItem("value",JSON.stringify(sessionNum));
    renderSessionIncrement();
   
}

function renderLocalIncrement() {
   
    var text=document.getElementById("localLabel");
    text.innerHTML = localStorage.getItem("value");

}
function renderSessionIncrement() {
    
    var text=document.getElementById("sessionLabel");
    text.innerHTML = sessionStorage.getItem("value");

}

function render(){
renderLocalIncrement();
renderSessionIncrement();
}
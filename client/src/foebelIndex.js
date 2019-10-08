let convert = {};

let buttons = document.querySelectorAll("button.confirmScore");
buttons[0].addEventListener("click", confirmScoreClicked);

function confirmScoreClicked(event){
    console.log(event.target.parentNode.childNodes[3].value);
    let homeScore = event.target.parentNode.childNodes[3].value
    let awayScore = event.target.parentNode.childNodes[1].value;
}




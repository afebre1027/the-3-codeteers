var topScores = document.getElementById("topScores");
var highScores = JSON.parse(localStorage.getItem("floppyhighScores")) || [];

function loadScores (){
    var savedScores = highScores;

    //iterates through savesScores array
    for(var i = 0; i < 5; i++){
        //creates list element
        var top5Scores = document.createElement("li");

        //populates list element with saved initials and scores of the top 5
        top5Scores.innerHTML =savedScores[i].score;

        topScores.appendChild(top5Scores);
    }

}

loadScores();
var buttonColours = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function() {
    if(!started){
        $("#heading").text("LEVEL " + level);
        nextSequence();
        started = true;
    }
});

$(".oneBox").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(levelNumber){
    if(userClickedPattern[levelNumber] === gamePattern[levelNumber]){
        if(userClickedPattern.length === gamePattern.length){ // level over
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over!! Press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        startOver();
    }
}


function nextSequence(){
    userClickedPattern = []; // new level begins;
    level++;
    $("#heading").text("LEVEL "+level);

    var ran = Math.floor(Math.random()*4);
    var randomColor = buttonColours[ran];
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    gamePattern.push(randomColor);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("user-press");
    setTimeout(function(){
        $("#"+currentColour).removeClass("user-press");
    },100);
}

function playSound(soundName){
    var audio = new Audio("./sounds/"+soundName+".mp3");
    audio.play();
}

function startOver(){
    // $("h1").text("You did wrong! Here is correct pattern:");
    // for(var i = 0 ; i < gamePattern.length ; i++){
    //     setTimeout(function(){
    //         animatePress(gamePattern[i]);
    //         playSound(gamePattern[i]);
    //     },100);
    // }
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

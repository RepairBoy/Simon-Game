var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".instructions").on("click", function(){
    $(".textBox").toggleClass("makevisible");
})

$(document).on("keydown", nextSequence);
$("h1").on("click", nextSequence);  //for phones

$(".btn").on("click",function(){
    $(document).off("keydown", nextSequence);
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
    $(document).off("keydown", nextSequence);
    $("h1").off("click", nextSequence);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentButton){
    $("#" + currentButton).addClass("pressed");
    setTimeout(() => {
        $("#" + currentButton).removeClass("pressed");
    }, 100); 
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $(document).on("keydown", nextSequence);
        $("h1").on("click", nextSequence);
    }
    else if (gamePattern.length === userClickedPattern.length) {
        userClickedPattern = [];
        setTimeout(() => {
            nextSequence();
        }, 500);
    }
}


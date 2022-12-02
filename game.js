//Variables

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//Functions

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
})

//"Base of the game"
function nextSequence() {

  randomNumber = Math.round(Math.random() * 3); //Generates random number
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  flash(randomChosenColour);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").click(function() {

  var userChosenColour = ($(this).attr("id"));
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function flash(name) {
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart")
    playSound("wrong");
    $(document.body).addClass("game-over");
    setTimeout(() => {
      $(document.body).removeClass("game-over")
    }, 200);
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
  console.log(level);
}

var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;
$(document).keydown(function () { 
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    
    
});
  

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  palySound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length -1);
  console.log(userClickPattern);


});
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length === userClickPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("wrong");
        palySound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence()
{
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  palySound(randomChosenColour);
  console.log(gamePattern);

}
function palySound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();

}
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" +currentColour).removeClass("pressed");
  }, 100);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}
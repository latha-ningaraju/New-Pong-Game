var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;

function preload(){
  scoreSound = loadSound('score.mp3');
  wall_hitSound = loadSound('wall_hit.mp3');
  hitSound = loadSound('hit.mp3');
}

function setup() {
  
createCanvas(windowWidth,windowHeight);

//create a user paddle sprite
userPaddle = createSprite(width-10,height/2,10,70);

//create a computer paddle sprite
computerPaddle = createSprite(5,height/2,10,70);

//create the pong ball
ball = createSprite(width/2,height/2,12,12);

computerScore = 0;
playerScore = 0;
gameState = "serve";
}

function draw() {  
  //fill the computer screen with white color
  background("white");
  edges = createEdgeSprites();
  //display Scores
  text(computerScore,width/2 - 30,20);
  text(playerScore, width/2 + 30,20);

  //draw dotted lines
  for (var i = 0; i < height; i+=20) {
     line(width/2,i,width/2,i+10);
  }

  if (gameState === "serve") {
    text("Press Space to Serve",width/2-50,height/2-20);
  }

  if (gameState === "over") {
    text("Game Over!",width/2-30,height/2-40);
    text("Press 'R' to Restart",width/2-50,height/2-20);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 2;
    ball.velocityY = 3;
    gameState = "play";
  }

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;

  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    hitSound.play();
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.x > width || ball.x < 0){
    scoreSound.play();

  if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    ball.x = width/2;
    ball.y = height/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    wall_hitSound.play();
  }

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
}

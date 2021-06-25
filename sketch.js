var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;

function preload(){
  monkey_running =            loadAnimation("New folder/sprite_0.png","New folder/sprite_1.png","New folder/sprite_2.png","New folder/sprite_3.png","New folder/sprite_4.png","New folder/sprite_5.png","New folder/sprite_6.png","New folder/sprite_7.png","New folder/sprite_8.png");
  
  bananaImage = loadImage("New folder/banana.png");
  obstacleImage = loadImage("New folder/obstacle.png"); 
}

function setup() {
  createCanvas(600,600);
  
  score = 0;
  survivalTime = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    gamestate = END;
   } else if(gamestate = END){
background.velocityX = 0;
monkey.visible = false;
foodGroup.destroyEach();
obstacleGroup.destroyEach();
textSize(30);
fill(255);
text("Game Over !!! ",300,200);
    }
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
  
  
  survivalTime = Math.ceil(frameCount/getFrameRate());
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: "+ survivalTime, 100, 50);
  
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    monkey.depth = banana.depth+1;
    
    foodGroup.add(banana);
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=scroe+2;
      monkey.scale += + 0.1;
    }
  }
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800,320,10,40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}
 if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
